/** @format */

import { useEffect, useState } from 'react';
import { ITransactionGet, ITransactionPost } from './TransactionTypes';
import { commitTransaction, fetchRecipients, fetchTransactions, fetchTransactionsStatuses } from './TransactionsData';
import { WebApiResponse } from '../WebApiTypes';
import { useCustomModal } from '../../shared/modals/CustomModalHooks';
import { IUserGet } from '../auth/AuthTypes';
import { IValidation } from '../ValidationTypes';

export const useTransactionList = () => {
  const [transactions, setTransactions] = useState<ITransactionGet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateTransactions = async (transaction: ITransactionGet) => {
    setLoading(true);

    const transactionsStatusesResponse = await fetchTransactionsStatuses(transactions);

    if (transactionsStatusesResponse.isSuccess) {
      setTransactions(prev => {
        const prevMap = new Map(prev.map(x => [x.id, x]));

        for (let i = 0; i < transactionsStatusesResponse.data.length; i++) {
          const transactionStatus = transactionsStatusesResponse.data[i];
          const targetTransaction = prevMap.get(transactionStatus.id);

          if (targetTransaction) {
            targetTransaction.status = transactionStatus.status;
          }
        }

        return [...prev, transaction];
      });
    } else {
      setError(transactionsStatusesResponse.error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    fetchTransactions().then((x: WebApiResponse<ITransactionGet[]>) => {
      if (x.isSuccess) {
        setTransactions(x.data);
      } else {
        setError(x.error.message);
      }

      setLoading(false);
    });
  }, []);

  return { transactions, updateTransactions, loading, error };
};

export const useTransactionCreate = (transaction: ITransactionGet | undefined, updateTransactions: (transaction: ITransactionGet) => void) => {
  const { closeModal } = useCustomModal();
  const [transactionPostModel, setTransactionPostModel] = useState<ITransactionPost>(
    transaction && transaction.type === 'outcome'
      ? transaction
      : {
          amount: 0,
          user: {
            id: '',
            email: '',
          },
        },
  );
  const [recipients, setRecipients] = useState<IUserGet[]>([]);
  const [validation, setValidation] = useState<IValidation>({ message: '', isValid: true });

  useEffect(() => {
    fetchRecipients().then((x: WebApiResponse<IUserGet[]>) => {
      if (x.isSuccess) {
        setRecipients(x.data);
      } else {
        setValidation({ message: x.error.message, isValid: false });
      }
    });
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidation({ message: '', isValid: true });

    const commitTransactionResponse = await commitTransaction(transactionPostModel);

    if (commitTransactionResponse.isSuccess) {
      closeModal();
      updateTransactions(commitTransactionResponse.data);
    } else {
      setValidation({ message: commitTransactionResponse.error.message, isValid: false });
    }
  };

  const onChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    if (value > 0) {
      setTransactionPostModel({ ...transactionPostModel, amount: Number(value) });
    } else {
      setValidation({ message: 'Amount must be a number', isValid: false });
    }
  };

  const onChangeRecipient = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (recipients.find(x => x.email === value)) {
      setTransactionPostModel({ ...transactionPostModel, user: { id: '', email: value } });
    } else {
      setValidation({ message: 'Recipient not found', isValid: false });
    }
  };

  return { transactionPost: transactionPostModel, recipients, validation, onChangeAmount, onChangeRecipient, onSubmit };
};

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

export const useTransactionCreate = (
  transaction: ITransactionGet | undefined,
  updateTransactions: (transaction: ITransactionGet) => void,
) => {
  const { closeModal } = useCustomModal();
  const [transactionPostModel, setTransactionPostModel] = useState<ITransactionPost>(
    transaction && transaction.type === 'outcome'
      ? transaction
      : {
          amount: 100,
          user: {
            id: '',
            email: '',
          },
        },
  );
  const [recipients, setRecipients] = useState<IUserGet[]>([]);
  const [validation, setValidation] = useState<IValidation>({ message: '', isValid: true });

  // Fetch recipients
  useEffect(() => {
    fetchRecipients().then((x: WebApiResponse<IUserGet[]>) => {
      if (x.isSuccess) {
        setRecipients(x.data);
      } else {
        setValidation({ message: x.error.message, isValid: false });
      }
    });
  }, []);

  // Set default recipient for a new outcome transaction
  useEffect(() => {
    if (!transaction && recipients.length > 0) {
      setTransactionPostModel({
        ...transactionPostModel,
        user: { ...transactionPostModel.user, id: recipients[0].id, email: recipients[0].email },
      });
    }
  }, [recipients, recipients.length, transaction, transactionPostModel]);

  // Validate transaction post model
  useEffect(() => {
    setValidation({ message: '', isValid: true });

    if (transactionPostModel.amount <= 0) {
      setValidation({ message: 'Amount must be greater than 0', isValid: false });
    }

    if (!transactionPostModel.user.id || transactionPostModel.user.id.length === 0) {
      setValidation({ message: 'Choose a recipient', isValid: false });
    }
  }, [recipients, transactionPostModel, transactionPostModel.amount, transactionPostModel.user.id]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validation.isValid) {
      return;
    }

    const recipient = recipients.find(x => x.id === transactionPostModel.user.id);

    if (recipient) {
      transactionPostModel.user.email = recipient.email;
    }

    const commitTransactionResponse = await commitTransaction(transactionPostModel);

    if (commitTransactionResponse.isSuccess) {
      closeModal();
      updateTransactions(commitTransactionResponse.data);
    } else {
      setValidation({ message: commitTransactionResponse.error.message, isValid: false });
    }
  };

  const onChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionPostModel({ ...transactionPostModel, amount: Number(event.target.value) });
  };

  const onChangeRecipient = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTransactionPostModel({ ...transactionPostModel, user: { ...transactionPostModel.user, id: event.target.value } });
  };

  return { transactionPost: transactionPostModel, recipients, validation, onChangeAmount, onChangeRecipient, onSubmit };
};

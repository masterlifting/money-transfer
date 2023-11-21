/** @format */

import { useEffect, useState } from 'react';
import { IUserTransactionGet, IUserTransactionPost } from './UserTransactionsTypes';
import {
  commitUserTransaction,
  fetchRecipients,
  fetchUserTransactions,
  fetchUserTransactionsStatuses,
} from './UserTransactionsData';
import { WebApiResponse } from '../../../shared/types/WebApiTypes';
import { IUserGet } from '../types/UserTypes';
import { IValidation } from '../../../shared/types/ValidationTypes';
import { useModal } from '../../../shared/components/modals/ModalHooks';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<IUserTransactionGet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateTransactions = async (transaction: IUserTransactionGet) => {
    setLoading(true);

    const transactionsStatusesResponse = await fetchUserTransactionsStatuses(transactions);

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

    fetchUserTransactions().then((x: WebApiResponse<IUserTransactionGet[]>) => {
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
  transaction: IUserTransactionGet | undefined,
  updateTransactions: (transaction: IUserTransactionGet) => void,
) => {
  const { closeModal } = useModal();
  const [transactionPostModel, setTransactionPostModel] = useState<IUserTransactionPost>(
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

  // Fetch recipients and set default recipient
  useEffect(() => {
    fetchRecipients().then((x: WebApiResponse<IUserGet[]>) => {
      if (x.isSuccess) {
        setRecipients(x.data);
        if (!transaction && x.data.length > 0) {
          setTransactionPostModel({
            ...transactionPostModel,
            user: { ...transactionPostModel.user, id: x.data[0].id, email: x.data[0].email },
          });
        }
      } else {
        setValidation({ message: x.error.message, isValid: false });
      }
    });
  }, []);

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

    const commitTransactionResponse = await commitUserTransaction(transactionPostModel);

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

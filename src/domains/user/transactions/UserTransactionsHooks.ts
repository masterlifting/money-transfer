/** @format */

import { useEffect, useState } from 'react';
import { IUserTransactionGet, IUserTransactionPost, IUserTransactionsFilter } from './UserTransactionsTypes';
import {
  commitUserTransaction,
  fetchFilteredUserTransactions,
  fetchUserTransactionRecipients,
  fetchUserTransactionsStatuses,
} from './UserTransactionsData';
import { IUserGet } from '../types/UserTypes';
import { IValidation } from '../../../shared/types/ValidationTypes';
import { useModal } from '../../../shared/components/modals/ModalHooks';
import { useAuthState } from '../../auth/AuthHooks';
import { PageItemsType } from '../../../shared/components/paginators/PaginationComponent';
import { useUserBalance } from '../balance/UserBalanceHooks';

export const useTransactions = () => {
  const { authUser } = useAuthState();
  const { updateUserBalance } = useUserBalance();

  const [transactions, setTransactions] = useState<IUserTransactionGet[]>([]);
  const [transactionsTotalCount, setTransactionsTotalCount] = useState(0);
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
      setTransactionsTotalCount(prev => prev + 1);
      updateUserBalance(authUser);
    } else {
      setError(transactionsStatusesResponse.error.message);
    }

    setLoading(false);
  };

  const setTransactionsPerPage = (items: PageItemsType, page: number) => {
    setLoading(true);

    const filter: IUserTransactionsFilter = {
      items,
      page,
    };

    fetchFilteredUserTransactions(filter, authUser).then(response => {
      if (response.isSuccess) {
        setTransactions(response.data.items);
        setTransactionsTotalCount(response.data.totalCount);
      } else {
        setError(response.error.message);
      }
    });

    setLoading(false);
  };

  return { transactionsTotalCount, transactions, updateTransactions, setTransactionsPerPage, loading, error };
};

export const useTransactionCreate = (
  transaction: IUserTransactionGet | undefined,
  updateTransactions: (transaction: IUserTransactionGet) => void,
) => {
  const { authUser } = useAuthState();
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
    fetchUserTransactionRecipients(authUser).then(response => {
      if (response.isSuccess) {
        setRecipients(response.data);
        if (!transaction && response.data.length > 0) {
          setTransactionPostModel({
            ...transactionPostModel,
            user: { ...transactionPostModel.user, id: response.data[0].id, email: response.data[0].email },
          });
        }
      } else {
        setValidation({ message: response.error.message, isValid: false });
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

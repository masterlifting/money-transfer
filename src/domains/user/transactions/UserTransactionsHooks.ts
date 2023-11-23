/** @format */

import { useEffect, useState } from 'react';
import { ISortedData, IUserTransactionGet, IUserTransactionPost, IUserTransactionsFilter } from './UserTransactionsTypes';
import { commitUserTransaction, fetchFilteredUserTransactions, fetchUserTransactionRecipients } from './UserTransactionsData';
import { IUserGet } from '../types/UserTypes';
import { IValidation } from '../../../shared/types/ValidationTypes';
import { useModalState } from '../../../shared/components/modals/ModalHooks';
import { useUserBalanceState } from '../balance/UserBalanceHooks';
import { IAuthUserGet } from '../../auth/AuthTypes';
import { IPagination } from '../../../shared/components/paginators/PaginationTypes';

export const useUserTransactions = (user: IAuthUserGet) => {
  const { isModalOpen } = useModalState();
  const { updateUserBalance } = useUserBalanceState();

  const [transactions, setTransactions] = useState<IUserTransactionGet[]>([]);
  const [sorting, setSorting] = useState<ISortedData>({ fieldName: 'date', direction: 'desc' });
  const [pagination, setPagination] = useState<IPagination>({ pageNumber: 1, pageItemsCount: 10 });
  const [transactionsTotalCount, setTransactionsTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);

    const filter: IUserTransactionsFilter = {
      pagination: pagination,
      sorting: sorting,
    };

    fetchFilteredUserTransactions(filter, user).then(response => {
      if (response.isSuccess) {
        setTransactions(response.data.items);
        setTransactionsTotalCount(response.data.totalCount);
        updateUserBalance(user);
      } else {
        setError(response.error.message);
      }
    });

    setLoading(false);
  }, [transactionsFilter, isModalOpen]);

  return {
    userTransactionsTotalCount: transactionsTotalCount,
    userTransactions: transactions,
    userTransactionsFilter: transactionsFilter,
    setTransactionsFilter,
    userTransactionsLoading: loading,
    useUserTransactionsError: error,
  };
};

export const useUserTransactionCreate = (user: IAuthUserGet, transaction: IUserTransactionGet | undefined) => {
  const { closeModal, openModal } = useModalState();

  const [recipients, setRecipients] = useState<IUserGet[]>([]);
  const [validation, setValidation] = useState<IValidation>({ message: '', isValid: true });
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

  // Fetch recipients
  useEffect(() => {
    if (transaction && transaction.type === 'outcome') {
      setRecipients([transaction.user]);
    } else {
      fetchUserTransactionRecipients(user).then(response => {
        if (response.isSuccess) {
          setRecipients(response.data);
        } else {
          setValidation({ message: response.error.message, isValid: false });
        }
      });
    }
  }, [user, transaction, openModal]);

  // Validate transaction post model
  useEffect(() => {
    setValidation({ message: '', isValid: true });

    if (transactionPostModel.amount <= 0) {
      setValidation({ message: 'Amount must be greater than 0', isValid: false });
    }

    if (!transactionPostModel.user.id || transactionPostModel.user.id.length === 0) {
      setValidation({ message: '', isValid: false });
    }
  }, [transactionPostModel]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validation.isValid) {
      return;
    }

    const recipient = recipients.find(x => x.id === transactionPostModel.user.id);

    if (recipient) {
      transactionPostModel.user.email = recipient.email;
    }

    const commitTransactionResponse = await commitUserTransaction(user, transactionPostModel);

    if (commitTransactionResponse.isSuccess) {
      closeModal();
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

/** @format */

import { useEffect, useState } from 'react';
import {
  IUserTransactionGet,
  IUserTransactionPost,
  IUserTransactionsFilter,
  IUserTransactionsGet,
} from './UserTransactionsTypes';
import { commitUserTransaction, fetchUserTransactions, fetchUserTransactionRecipients } from './UserTransactionsData';
import { IUserGet } from '../types/UserTypes';
import { useModalContext } from '../../../shared/components/modals/ModalHooks';
import { useUserBalanceContext } from '../balance/UserBalanceHooks';
import { IAuthUserGet } from '../../auth/AuthTypes';
import { IPagination } from '../../../shared/components/paginations/PaginationTypes';
import { ISorting } from '../../../shared/components/sortings/SortingFieldTypes';
import { IError, ValidationResult } from '../../../shared/components/errors/ErrorTypes';

export const useUserTransactions = (user: IAuthUserGet) => {
  const { isModalOpen } = useModalContext();
  const { updateUserBalance } = useUserBalanceContext();

  const [transactions, setTransactions] = useState<IUserTransactionsGet>({ items: [], totalCount: 0 });
  const [sorting, setSorting] = useState<ISorting>({ fieldName: 'date', direction: 'desc' });
  const [pagination, setPagination] = useState<IPagination>({ pageNumber: 1, pageItemsCount: 10 });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<IError>({ message: '' });

  useEffect(() => {
    setLoading(true);

    const filter: IUserTransactionsFilter = {
      pagination: pagination,
      sorting: sorting,
    };

    fetchUserTransactions(user, filter).then(response => {
      if (response.isSuccess) {
        setTransactions(response.data);
        updateUserBalance(user);
      } else {
        setError({ message: response.error.message });
      }
    });

    setLoading(false);
  }, [sorting, pagination, isModalOpen, user]);

  return {
    userTransactions: transactions,
    userTransactionsSorting: sorting,
    userTransactionsPagination: pagination,
    userTransactionsLoading: loading,
    userTransactionsError: error,
    userTransactionsSetSorting: setSorting,
    userTransactionsSetPagination: setPagination,
  };
};

export const useUserTransactionCreate = (user: IAuthUserGet, transaction: IUserTransactionGet | undefined) => {
  const { closeModal, openModal } = useModalContext();

  const [validationResult, setValidationResult] = useState<ValidationResult>({ isValid: false, errors: [] });
  const [recipients, setRecipients] = useState<IUserGet[]>([]);
  const [transactionPost, settransactionPost] = useState<IUserTransactionPost>(
    transaction && transaction.type === 'Outcome'
      ? { ...transaction, amount: { ...transaction.amount, value: -transaction.amount.value } }
      : {
          amount: { value: 100, currency: 'USD', symbol: '$' },
          user: {
            id: '',
            email: '',
          },
        },
  );

  // Fetch recipients
  useEffect(() => {
    if (transaction && transaction.type === 'Outcome') {
      setRecipients([transaction.user]);
    } else {
      fetchUserTransactionRecipients(user).then(response => {
        if (response.isSuccess) {
          setRecipients(response.data);
        } else {
          setValidationResult({ isValid: false, errors: [{ message: response.error.message }] });
        }
      });
    }
  }, [user, transaction, openModal]);

  // Validate transaction post model
  useEffect(() => {
    setValidationResult({ isValid: true });

    if (transactionPost.amount.value <= 0) {
      setValidationResult({ isValid: false, errors: [{ message: 'Amount must be greater than 0' }] });
    }
    if (!transactionPost?.user.id) {
      setValidationResult({ isValid: false, errors: [{ message: '' }] });
    }
  }, [transactionPost.amount, transactionPost.user.id]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validationResult.isValid) {
      return;
    }

    const recipient = recipients.find(x => x.id === transactionPost.user.id);

    if (recipient) {
      transactionPost.user.email = recipient.email;
    }

    const commitTransactionResponse = await commitUserTransaction(user, transactionPost);

    if (commitTransactionResponse.isSuccess) {
      closeModal();
    } else {
      setValidationResult({ isValid: false, errors: [{ message: commitTransactionResponse.error.message }] });
    }
  };

  const onChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    settransactionPost({ ...transactionPost, amount: { ...transactionPost.amount, value: +event.target.value } });
  };

  const onChangeRecipient = (event: React.ChangeEvent<HTMLSelectElement>) => {
    settransactionPost({ ...transactionPost, user: { ...transactionPost.user, id: event.target.value } });
  };

  return {
    userTransactionPostModel: transactionPost,
    userTransactionRecipients: recipients,
    userTransactionCreateValidationResult: validationResult,
    onSubmitUserTransactionCreate: onSubmit,
    onChangeAmountUserTransactionCreate: onChangeAmount,
    onChangeRecipientUserTransactionCreate: onChangeRecipient,
  };
};

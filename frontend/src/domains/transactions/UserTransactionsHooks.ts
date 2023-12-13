/** @format */

import { useEffect, useState } from 'react';
import { IUserTransactionGet, IUserTransactionPost, IUserTransactionsGet } from '../../../../shared/types/UserTransactionsTypes';
import { commitUserTransaction, fetchUserTransactions, fetchUserTransactionRecipients } from './userTransactionsData';
import { IUserGet } from '../../../../shared/types/UserTypes';
import { useModalContext } from '../../shared/components/modals/modalHooks';
import { useUserBalanceContext } from '../balance/userBalanceHooks';
import { IAuthUserGet } from '../../../../shared/types/AuthTypes';
import { IPagination } from '../../shared/components/paginations/paginationTypes';
import { ISorting } from '../../shared/components/sortings/sortingFieldTypes';
import { IError, ValidationResultType } from '../../../../shared/types/ErrorTypes';

export const useUserTransactions = (user: IAuthUserGet) => {
  const { closeModal } = useModalContext();
  const { updateUserBalance } = useUserBalanceContext();

  const [error, setError] = useState<IError>({ message: '' });
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState<ISorting>({ fieldName: 'date', direction: 'desc' });
  const [pagination, setPagination] = useState<IPagination>({ pageNumber: 1, pageItemsCount: 10 });

  const [transactions, setTransactions] = useState<IUserTransactionsGet>({ items: [], totalCount: 0 });

  useEffect(() => {
    setLoading(true);

    fetchUserTransactions(user, {
      pagination: pagination,
      sorting: sorting,
    }).then(response => {
      if (response.isSuccess) {
        setTransactions(response.data);
        updateUserBalance(user);
      } else {
        setError({ message: response.error.message });
      }
    });

    setLoading(false);
  }, [sorting, pagination, closeModal, user, updateUserBalance]);

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

  const [recipients, setRecipients] = useState<IUserGet[]>([]);
  const [validationResult, setValidationResult] = useState<ValidationResultType>({ isValid: false, errors: [] });

  const setDefaultTransactionPostModel = (transaction: IUserTransactionGet | undefined): IUserTransactionPost =>
    transaction && transaction.type === 'Outcome'
      ? { ...transaction, amount: { ...transaction.amount, value: -transaction.amount.value } }
      : {
          amount: { value: 100, currency: 'USD', symbol: '$' },
          user: {
            id: '',
            email: '',
          },
        };
  const [transactionPost, setTransactionPost] = useState<IUserTransactionPost>(() => setDefaultTransactionPostModel(transaction));

  // Fetch recipients for transaction
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

  // Validate transaction
  const getTransactionValidationErrors = (transaction: IUserTransactionPost) => {
    const errors: string[] = [];

    if (!transaction.user.id) {
      errors.push('Recipient is required');
    }

    if (transaction.amount.value <= 0) {
      errors.push('Amount must be greater than 0');
    }

    return errors;
  };
  useEffect(() => {
    const validationErrors = getTransactionValidationErrors(transactionPost);

    if (validationErrors.length === 0) {
      setValidationResult({ isValid: true });
    } else {
      setValidationResult({ isValid: false, errors: validationErrors.map(error => ({ message: error })) });
    }
  }, [transactionPost]);

  // Submit transaction
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

  return {
    userTransactionPostModel: transactionPost,
    userTransactionRecipients: recipients,
    userTransactionCreateValidationResult: validationResult,
    onSubmitUserTransactionCreate: onSubmit,
    onChangeAmountUserTransactionCreate: (event: React.ChangeEvent<HTMLInputElement>) =>
      setTransactionPost({ ...transactionPost, amount: { ...transactionPost.amount, value: +event.target.value } }),
    onChangeRecipientUserTransactionCreate: (event: React.ChangeEvent<HTMLSelectElement>) =>
      setTransactionPost({ ...transactionPost, user: { ...transactionPost.user, id: event.target.value } }),
  };
};

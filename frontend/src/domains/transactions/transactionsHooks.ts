/** @format */

import { useEffect, useState } from 'react';
import { IUserTransactionGet, IUserTransactionPost } from '../../../../shared/types/userTransactionsTypes';
import { IAuthUserGet } from '../../../../shared/types/authTypes';
import { ValidationResultType } from '../../../../shared/types/errorTypes';
import { useCreateTransactionMutation, useGetTransactionsQuery } from './transactionsApi';
import { useAppActions } from '../../shared/hooks/useAppActions';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import { useLazyGetUserBalanceQuery, useLazyGetUsersQuery } from '../users/usersApi';
import { ISorting } from '../../../../shared/types/sortingFieldTypes';
import { IPagination } from '../../../../shared/types/paginationTypes';

export const useTransactions = (user: IAuthUserGet) => {
  const { transactions } = useAppSelector(x => x.transactionsState);

  const { setTransactionsState } = useAppActions();

  const [sorting, setSorting] = useState<ISorting>({ fieldName: 'date', direction: 'desc' });
  const [pagination, setPagination] = useState<IPagination>({ pageNumber: 1, pageItemsCount: 10 });

  const {
    isLoading,
    data: apiResult,
    error: apiError,
  } = useGetTransactionsQuery({
    userId: user.id,
    sorting: sorting,
    pagination: pagination,
  });

  useEffect(() => {
    if (apiResult && apiResult.isSuccess) {
      setTransactionsState(apiResult.data);
    }
  }, [apiResult, setTransactionsState]);

  return {
    isLoading,
    fetchingError: { error: { message: apiError?.toString() || '' } },

    transactions,

    sortingState: sorting,
    setSortingState: setSorting,

    paginationState: pagination,
    setPaginstionState: setPagination,
  };
};

const getTransactionValidationError = (transaction: IUserTransactionPost) => {
  if (!transaction.user.id || transaction.user.id === '') {
    return 'Recipient is required';
  }

  if (transaction.amount.value <= 0) {
    return 'Amount must be greater than 0';
  }
};

export const useTransactionCreate = (user: IAuthUserGet, transaction: IUserTransactionGet | undefined) => {
  const { users, recepients } = useAppSelector(x => x.usersState);

  const { closeModal, setUsersState, setRecepientsState, addTransactionToState } = useAppActions();

  const [validationResult, setValidationResult] = useState<ValidationResultType>({ isValid: false, errors: [] });

  const [getUsers, { isError: apiUsersHasError, data: apiUsersResult, error: apiUsersError }] = useLazyGetUsersQuery();
  const [getUserBalance] = useLazyGetUserBalanceQuery();
  const [
    createTransaction,
    { isError: apiCreateTransactionHasError, data: apiCreateTransactionResult, error: apiCreateTransactionError },
  ] = useCreateTransactionMutation();

  const setDefaultTransactionPostModel = (transaction: IUserTransactionGet | undefined): IUserTransactionPost =>
    transaction && transaction.type === 'Outcome'
      ? { ...transaction, senderId: user.id, amount: { ...transaction.amount, value: -transaction.amount.value } }
      : {
          senderId: user.id,
          amount: { value: 100, currency: 'USD', symbol: '$' },
          user: {
            id: '',
            email: '',
          },
        };

  const [transactionPost, setTransactionPost] = useState<IUserTransactionPost>(() => setDefaultTransactionPostModel(transaction));

  // Users API error handling
  useEffect(() => {
    if (apiUsersResult) {
      if (apiUsersResult.isSuccess) {
        setValidationResult({ isValid: true });
        setUsersState(apiUsersResult.data);
      } else {
        setValidationResult({ isValid: false, errors: [{ message: apiUsersResult.error.message }] });
      }
    } else if (apiUsersHasError) {
      setValidationResult({ isValid: false, errors: [{ message: apiUsersError?.toString() || '' }] });
    } else {
      setValidationResult({ isValid: true });
    }
  }, [apiUsersResult, apiUsersHasError, apiUsersError, setUsersState]);

  // Transaction API error handling
  useEffect(() => {
    if (apiCreateTransactionResult) {
      if (apiCreateTransactionResult.isSuccess) {
        setValidationResult({ isValid: true });
        getUserBalance(user.id);
      } else {
        setValidationResult({ isValid: false, errors: [{ message: apiCreateTransactionResult.error.message }] });
      }
    } else if (apiCreateTransactionHasError) {
      setValidationResult({ isValid: false, errors: [{ message: apiCreateTransactionError?.toString() || '' }] });
    } else {
      setValidationResult({ isValid: true });
    }
  }, [apiCreateTransactionResult, apiCreateTransactionHasError, apiCreateTransactionError, getUserBalance, user.id]);

  // Validate transaction
  useEffect(() => {
    const transactionValidationError = getTransactionValidationError(transactionPost);

    if (transactionValidationError) {
      setValidationResult({ isValid: false, errors: [{ message: transactionValidationError }] });
    } else {
      setValidationResult({ isValid: true });
    }
  }, [transactionPost]);

  // Fetch recipients for transaction
  useEffect(() => {
    if (!transaction) {
      getUsers(null);
    }

    setRecepientsState();
  }, [transaction, getUsers, users, setRecepientsState]);

  useEffect(() => {
    if (apiCreateTransactionResult && apiCreateTransactionResult.isSuccess) {
      addTransactionToState(apiCreateTransactionResult.data);
      closeModal();
    }
  }, [apiCreateTransactionResult, addTransactionToState, closeModal]);

  // Submit transaction
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validationResult.isValid && createTransaction(transactionPost);
  };

  return {
    closeModal,
    userTransactionPostModel: transactionPost,
    userTransactionRecipients: recepients,
    userTransactionCreateValidationResult: validationResult,
    onSubmitUserTransactionCreate: onSubmit,
    onChangeAmountUserTransactionCreate: (event: React.ChangeEvent<HTMLInputElement>) =>
      setTransactionPost({ ...transactionPost, amount: { ...transactionPost.amount, value: +event.target.value } }),
    onChangeRecipientUserTransactionCreate: (event: React.ChangeEvent<HTMLSelectElement>) =>
      setTransactionPost({ ...transactionPost, user: { ...transactionPost.user, id: event.target.value } }),
  };
};

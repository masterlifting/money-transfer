/** @format */

import { useEffect, useState } from 'react';
import { IUserTransactionGet, IUserTransactionPost } from '../../../../shared/types/userTransactionsTypes';
import { ValidationResultType } from '../../../../shared/types/errorTypes';
import { useCreateTransactionMutation, useLazyGetTransactionsQuery } from './transactionsApi';
import { useAppActions } from '../../shared/hooks/useAppActions';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import { useLazyGetUsersQuery } from '../users/usersApi';
import { ISorting } from '../../../../shared/types/sortingFieldTypes';
import { IPagination } from '../../../../shared/types/paginationTypes';
import { useValidateApiResult } from '../../shared/hooks/useValidateApiResult';
import { IUserGet } from '../../../../shared/types/userTypes';
import { IAuthUserGet } from '../../../../shared/types/authTypes';

export const useTransactions = (user: IAuthUserGet) => {
  const { transactions, totalCount } = useAppSelector(x => x.transactionsState);

  const { openModal, setTransactionsState } = useAppActions();

  const [sorting, setSorting] = useState<ISorting>({ fieldName: 'date', direction: 'desc' });
  const [pagination, setPagination] = useState<IPagination>({ pageNumber: 1, pageItemsCount: 10 });

  const [getTransactions, { isLoading, data, error }] = useLazyGetTransactionsQuery();
  const validationResult = useValidateApiResult(data, error, setTransactionsState);

  useEffect(() => {
    getTransactions({
      userId: user.id,
      sorting: sorting,
      pagination: pagination,
    });
  }, [user.id, getTransactions, pagination, sorting, totalCount]);

  return {
    openModal,

    isLoading,
    validationResult,

    totalCount,
    transactions,

    sortingState: sorting,
    setSortingState: setSorting,

    paginationState: pagination,
    setPaginstionState: setPagination,
  };
};

export const useTransactionCreate = (user: IUserGet, transaction: IUserTransactionGet | undefined) => {
  const [newTransaction, setNewTransaction] = useState<IUserTransactionPost>(() =>
    transaction && transaction.type === 'Outcome'
      ? { ...transaction, senderId: user.id, amount: { ...transaction.amount, value: -transaction.amount.value } }
      : {
          senderId: user.id,
          amount: { value: 100, currency: 'USD', symbol: '$' },
          user: {
            id: '',
            email: '',
          },
        },
  );

  const { recepients } = useAppSelector(x => x.usersState);
  const { closeModal, setUsersState, setRecepientsState, setRecepientState, changeState } = useAppActions();

  const [validationResult, setValidationResult] = useState<ValidationResultType>({ isValid: true });

  const [getUsers, { isLoading: isApiUsersLoading, data: apiUsersResult, error: apiUsersError }] = useLazyGetUsersQuery();
  const usersValidationResult = useValidateApiResult(apiUsersResult, apiUsersError, setUsersState);

  const [
    commitTransaction,
    { isLoading: isApiNewTransactionLoading, data: apiNewTransactionResult, error: apiNewTransactionError },
  ] = useCreateTransactionMutation();
  const newTransactionValidationResult = useValidateApiResult(apiNewTransactionResult, apiNewTransactionError, _ => {
    changeState();
    closeModal();
  });

  // Validation
  useEffect(() => {
    if (!usersValidationResult.isValid) {
      return setValidationResult(usersValidationResult);
    }

    if (!newTransactionValidationResult.isValid) {
      return setValidationResult(newTransactionValidationResult);
    }

    const transactionValidationResult = getTransactionValidationResult(transaction);

    if (!transactionValidationResult.isValid) {
      return setValidationResult(transactionValidationResult);
    }

    return setValidationResult({ isValid: true });
  }, [usersValidationResult, newTransactionValidationResult, transaction]);

  // Fetch recipients for the transaction
  useEffect(() => {
    if (!transaction) {
      getUsers(null);
      setRecepientsState();
    } else {
      setRecepientState(transaction.user);
    }
  }, [getUsers, setRecepientState, setRecepientsState, transaction]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validationResult.isValid && commitTransaction(newTransaction);
  };

  return {
    closeModal: () => closeModal(),

    isLoading: isApiUsersLoading || isApiNewTransactionLoading,
    validationResult,

    newTransaction,
    recepients,

    onChangeAmount: (event: React.ChangeEvent<HTMLInputElement>) =>
      setNewTransaction({ ...newTransaction, amount: { ...newTransaction.amount, value: +event.target.value } }),
    onChangeRecipient: (event: React.ChangeEvent<HTMLSelectElement>) =>
      setNewTransaction({ ...newTransaction, user: { ...newTransaction.user, id: event.target.value } }),

    onSubmit,
  };
};

const getTransactionValidationResult = (transaction: IUserTransactionGet | undefined): ValidationResultType => {
  if (!transaction) {
    return { isValid: true };
  }

  if (!transaction.user || !transaction.user.id || transaction.user.id === '') {
    return { isValid: false, errors: [{ message: 'Recipient is required' }] };
  }

  if (transaction.amount.value <= 0) {
    return { isValid: false, errors: [{ message: 'Amount must be greater than 0' }] };
  }

  return { isValid: true };
};

/** @format */

import { ValidationResultType } from '../../../../../shared/types';
import { IUser, IUserTransaction } from '../../interfaces';
import { ISorting, IPagination } from '../../../../../shared/interfaces';
import { useEffect, useState } from 'react';
import { useAppActions } from '../../../shared/hooks/useAppActions';
import { useAppSelector } from '../../../shared/hooks/useAppSelector';
import { useValidateApiResult } from '../../../shared/hooks/useValidateApiResult';
import { useLazyGetRecepientsQuery, useLazyGetTransactionsQuery, usePostTransactionMutation } from '../usersApi';
import { IUserTransactionRequest } from '../../../../../shared/interfacesDto';

export const useGetUserTransactions = (user: IUser) => {
  const { transactions, transactionsTotalCount } = useAppSelector(x => x.usersState);

  const { openModal, setTransactionsState } = useAppActions();

  const [sorting, setSorting] = useState<ISorting>({ fieldName: 'date', direction: 'desc' });
  const [pagination, setPagination] = useState<IPagination>({ pageNumber: 1, pageItemsCount: 10 });

  const [getTransactions, { isLoading, data, error }] = useLazyGetTransactionsQuery();
  const validationResult = useValidateApiResult(data, error, setTransactionsState);

  useEffect(() => {
    getTransactions({
      userId: user.id,
      filter: {
        pageNumber: pagination.pageNumber,
        pageItemsCount: pagination.pageItemsCount,
        sortingFieldName: sorting.fieldName,
        sortingDirection: sorting.direction,
      },
    });
  }, [user.id, getTransactions, pagination, sorting, transactionsTotalCount]);

  return {
    openModal,

    isLoading,
    validationResult,

    transactionsTotalCount,
    transactions,

    sortingState: sorting,
    setSortingState: setSorting,

    paginationState: pagination,
    setPaginstionState: setPagination,
  };
};

export const useCreateUserTransaction = (user: IUser, transaction: IUserTransaction | undefined) => {
  const [newTransaction, setNewTransaction] = useState<IUserTransactionRequest>(() =>
    transaction && transaction.type === 'Outcome'
      ? {
          ...transaction,
          amount: { ...transaction.amount, value: -transaction.amount.value },
        }
      : {
          user: { id: '', email: '' },
          amount: { value: 100, currency: 'USD', symbol: '$' },
        },
  );

  const { recepients } = useAppSelector(x => x.usersState);
  const { closeModal, setRecepientsState, setRecepientState, setTransactionsTotalCountState: changeState } = useAppActions();

  const [validationResult, setValidationResult] = useState<ValidationResultType>({ isValid: true });

  const [getRecepients, { isLoading: isApiRecepientsLoading, data: apiRecepientsResult, error: apiRecepientsError }] =
    useLazyGetRecepientsQuery();
  const recepientsValidationResult = useValidateApiResult(apiRecepientsResult, apiRecepientsError, setRecepientsState);

  const [
    commitTransaction,
    { isLoading: isApiNewTransactionLoading, data: apiNewTransactionResult, error: apiNewTransactionError },
  ] = usePostTransactionMutation();
  const newTransactionValidationResult = useValidateApiResult(apiNewTransactionResult, apiNewTransactionError, _ => {
    changeState();
    closeModal();
  });

  // Validation
  useEffect(() => {
    if (!recepientsValidationResult.isValid) {
      return setValidationResult(recepientsValidationResult);
    }

    if (!newTransactionValidationResult.isValid) {
      return setValidationResult(newTransactionValidationResult);
    }

    const transactionValidationResult = getTransactionValidationResult(newTransaction);

    if (!transactionValidationResult.isValid) {
      return setValidationResult(transactionValidationResult);
    }

    return setValidationResult({ isValid: true });
  }, [recepientsValidationResult, newTransactionValidationResult, newTransaction]);

  // Fetch recipients for the transaction
  useEffect(() => {
    if (!transaction) {
      getRecepients(undefined);
    } else {
      setRecepientState(transaction.user);
    }
  }, [getRecepients, setRecepientState, transaction]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validationResult.isValid && commitTransaction({ userId: user.id, transaction: newTransaction });
  };

  return {
    closeModal: () => closeModal(),

    isLoading: isApiRecepientsLoading || isApiNewTransactionLoading,
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

const getTransactionValidationResult = (transaction: IUserTransactionRequest): ValidationResultType => {
  if (!transaction.user || !transaction.user.id || transaction.user.id === '') {
    return { isValid: false, errors: [{ message: 'Recipient is required' }] };
  }

  if (transaction.amount.value <= 0) {
    return { isValid: false, errors: [{ message: 'Amount must be greater than 0' }] };
  }

  return { isValid: true };
};

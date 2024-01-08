/** @format */

import { useEffect, useState } from 'react';
import { IPagination, ISorting } from '../../../../../shared/interfaces';
import { IUserTransactionRequest } from '../../../../../shared/interfacesDto';
import { ValidationResultType } from '../../../../../shared/types';
import { useAppActions } from '../../../hooks/useAppActions';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useValidateApiResult } from '../../../hooks/useValidateApiResult';
import { IUser } from '../../auth/authTypes';
import {
  useLazyGetUserTransactionRecipientsQuery,
  useLazyGetUserTransactionsQuery,
  usePostUserTransactionMutation,
} from './userTransactionsApi';
import { IUserTransaction } from './userTransactionsTypes';

export const useGetUserTransactions = (user: IUser) => {
  const { userTransactions, userTransactionsTotalCount } = useAppSelector(x => x.userTransactionsState);

  const { openModal, setUserTransactionsState } = useAppActions();

  const [sorting, setSorting] = useState<ISorting>({ fieldName: 'date', direction: 'desc' });
  const [pagination, setPagination] = useState<IPagination>({ pageNumber: 1, pageItemsCount: 10 });

  const [getTransactions, { isLoading, data, error }] = useLazyGetUserTransactionsQuery();
  const validationResult = useValidateApiResult(data, error, setUserTransactionsState);

  useEffect(() => {
    getTransactions({
      user: user,
      filter: {
        pageNumber: pagination.pageNumber,
        pageItemsCount: pagination.pageItemsCount,
        sortingFieldName: sorting.fieldName,
        sortingDirection: sorting.direction,
      },
    });
  }, [user, getTransactions, pagination, sorting, userTransactionsTotalCount]);

  return {
    openModal,

    isLoading,
    validationResult,

    transactionsTotalCount: userTransactionsTotalCount,
    transactions: userTransactions,

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

  const { userTransactionRecipients } = useAppSelector(x => x.userTransactionsState);
  const { closeModal, setUserTransactionRecipientsState, setUserTransactionRecipientState, addUserTransactionsTotalCountState } =
    useAppActions();

  const [validationResult, setValidationResult] = useState<ValidationResultType>({ isValid: true });

  const [getRecipients, { isLoading: isApiRecipientsLoading, data: apiRecipientsResult, error: apiRecipientsError }] =
    useLazyGetUserTransactionRecipientsQuery();
  const recipientsValidationResult = useValidateApiResult(
    apiRecipientsResult,
    apiRecipientsError,
    setUserTransactionRecipientsState,
  );

  const [
    commitTransaction,
    {
      isLoading: isApiNewTransactionLoading,
      data: apiNewTransactionResult,
      error: apiNewTransactionError,
      reset: resetCommitTransactionState,
    },
  ] = usePostUserTransactionMutation();
  const newTransactionValidationResult = useValidateApiResult(apiNewTransactionResult, apiNewTransactionError, _ => {
    addUserTransactionsTotalCountState();
    closeModal();
  });

  // Validation
  useEffect(() => {
    if (!recipientsValidationResult.isValid) {
      return setValidationResult(recipientsValidationResult);
    }

    if (!newTransactionValidationResult.isValid) {
      return setValidationResult(newTransactionValidationResult);
    }

    const transactionValidationResult = getTransactionValidationResult(newTransaction);

    if (!transactionValidationResult.isValid) {
      return setValidationResult(transactionValidationResult);
    }

    return setValidationResult({ isValid: true });
  }, [recipientsValidationResult, newTransactionValidationResult, newTransaction]);

  // Fetch recipients for the transaction
  useEffect(() => {
    if (!transaction) {
      getRecipients({ token: user.token });
    } else {
      setUserTransactionRecipientState(transaction.user);
    }
  }, [getRecipients, setUserTransactionRecipientState, transaction, user.token]);

  const onChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    resetCommitTransactionState();
    return setNewTransaction({ ...newTransaction, amount: { ...newTransaction.amount, value: +event.target.value } });
  };

  const searchRecipientEmails = (email: string) => {
    //TODO: use the backend to search for recipients
    return userTransactionRecipients.filter(x => x.email.toLowerCase().includes(email.toLowerCase())).map(x => x.email);
  };

  const onChangeRecipient = (email?: string) => {
    resetCommitTransactionState();
    const user = userTransactionRecipients.find(x => x.email === email);
    return setNewTransaction({ ...newTransaction, user: user ? user : { id: '', email: '' } });
  };

  const onChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    resetCommitTransactionState();
    return setNewTransaction({ ...newTransaction, description: event.target.value });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validationResult.isValid && commitTransaction({ user, transaction: newTransaction });
  };

  return {
    closeModal: () => closeModal(),

    isLoading: isApiRecipientsLoading || isApiNewTransactionLoading,
    validationResult,

    newTransaction,

    searchRecipientEmails,

    onChangeAmount,
    onChangeRecipient,
    onChangeDescription,

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

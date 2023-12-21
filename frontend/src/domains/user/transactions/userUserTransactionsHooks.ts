/** @format */

import { useEffect, useState } from 'react';
import { ValidationResultType } from '../../../../../shared/types';
import { ISorting, IPagination } from '../../../../../shared/interfaces';
import { IUserTransactionRequest } from '../../../../../shared/interfacesDto';
import { IUser, IUserTransaction } from '../../interfaces';
import { useAppActions } from '../../../shared/hooks/useAppActions';
import { useAppSelector } from '../../../shared/hooks/useAppSelector';
import { useValidateApiResult } from '../../../shared/hooks/useValidateApiResult';
import { useLazyGetRecipientsQuery, useLazyGetTransactionsQuery, usePostTransactionMutation } from '../userApi';

export const useGetUserTransactions = (user: IUser) => {
  const { transactions, transactionsTotalCount } = useAppSelector(x => x.userState);

  const { openModal, setTransactionsState } = useAppActions();

  const [sorting, setSorting] = useState<ISorting>({ fieldName: 'date', direction: 'desc' });
  const [pagination, setPagination] = useState<IPagination>({ pageNumber: 1, pageItemsCount: 10 });

  const [getTransactions, { isLoading, data, error }] = useLazyGetTransactionsQuery();
  const validationResult = useValidateApiResult(data, error, setTransactionsState);

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
  }, [user, getTransactions, pagination, sorting, transactionsTotalCount]);

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

  const { recipients } = useAppSelector(x => x.userState);
  const { closeModal, setRecipientsState, setRecipientState, setTransactionsTotalCountState } = useAppActions();

  const [validationResult, setValidationResult] = useState<ValidationResultType>({ isValid: true });

  const [getRecipients, { isLoading: isApiRecipientsLoading, data: apiRecipientsResult, error: apiRecipientsError }] =
    useLazyGetRecipientsQuery();
  const recipientsValidationResult = useValidateApiResult(apiRecipientsResult, apiRecipientsError, setRecipientsState);

  const [
    commitTransaction,
    {
      isLoading: isApiNewTransactionLoading,
      data: apiNewTransactionResult,
      error: apiNewTransactionError,
      reset: resetCommitTransactionState,
    },
  ] = usePostTransactionMutation();
  const newTransactionValidationResult = useValidateApiResult(apiNewTransactionResult, apiNewTransactionError, _ => {
    setTransactionsTotalCountState();
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
      setRecipientState(transaction.user);
    }
  }, [getRecipients, setRecipientState, transaction, user.token]);

  const onChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    resetCommitTransactionState();
    return setNewTransaction({ ...newTransaction, amount: { ...newTransaction.amount, value: +event.target.value } });
  };

  const searchRecipientEmails = (email: string) => {
    //TODO: use the backend to search for recipients
    return recipients.filter(x => x.email.toLowerCase().includes(email.toLowerCase())).map(x => x.email);
  };

  const onChangeRecipient = (email?: string) => {
    resetCommitTransactionState();
    const user = recipients.find(x => x.email === email);
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

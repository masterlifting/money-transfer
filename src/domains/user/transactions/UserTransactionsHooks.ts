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
import { IValidation } from '../../../shared/types/ValidationTypes';
import { useModalContext } from '../../../shared/components/modals/ModalHooks';
import { useUserBalanceContext } from '../balance/UserBalanceHooks';
import { IAuthUserGet } from '../../auth/AuthTypes';
import { IPagination } from '../../../shared/components/paginations/PaginationTypes';
import { ISorting } from '../../../shared/components/sortings/SortingFieldTypes';

export const useUserTransactions = (user: IAuthUserGet) => {
  const { isModalOpen } = useModalContext();
  const { updateUserBalance } = useUserBalanceContext();

  const [transactions, setTransactions] = useState<IUserTransactionsGet>({ items: [], totalCount: 0 });
  const [sorting, setSorting] = useState<ISorting>({ fieldName: 'date', direction: 'desc' });
  const [pagination, setPagination] = useState<IPagination>({ pageNumber: 1, pageItemsCount: 10 });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
        setError(response.error.message);
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

  const [recipients, setRecipients] = useState<IUserGet[]>([]);
  const [validation, setValidation] = useState<IValidation>({ message: '', isValid: true });
  const [postModel, setPostModel] = useState<IUserTransactionPost>(
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

    if (postModel.amount <= 0) {
      setValidation({ message: 'Amount must be greater than 0', isValid: false });
    }

    if (!postModel.user.id || postModel.user.id.length === 0) {
      setValidation({ message: '', isValid: false });
    }
  }, [postModel]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validation.isValid) {
      return;
    }

    const recipient = recipients.find(x => x.id === postModel.user.id);

    if (recipient) {
      postModel.user.email = recipient.email;
    }

    const commitTransactionResponse = await commitUserTransaction(user, postModel);

    if (commitTransactionResponse.isSuccess) {
      closeModal();
    } else {
      setValidation({ message: commitTransactionResponse.error.message, isValid: false });
    }
  };

  const onChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostModel({ ...postModel, amount: Number(event.target.value) });
  };

  const onChangeRecipient = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPostModel({ ...postModel, user: { ...postModel.user, id: event.target.value } });
  };

  return {
    userTransactionPostModel: postModel,
    userTransactionRecipients: recipients,
    userTransactionCreateValidation: validation,
    onSubmitUserTransactionCreate: onSubmit,
    onChangeAmountUserTransactionCreate: onChangeAmount,
    onChangeRecipientUserTransactionCreate: onChangeRecipient,
  };
};

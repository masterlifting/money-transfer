/** @format */

import { WebApiResponse } from '../WebApiTypes';
import { ITransactionGet, ITransactionPost, ITransactionStatusGet } from './TransactionTypes';
import { IUserGet } from '../auth/AuthTypes';

export const fetchTransactions = async (): Promise<WebApiResponse<ITransactionGet[]>> => {
  return {
    isSuccess: true,
    data: [
      {
        id: '1',
        type: 'income',
        status: 'completed',
        date: new Date(),
        amount: 100,
        user: {
          id: '1',
          email: 'jack@gmail.com',
        },
      },
      {
        id: '2',
        type: 'outcome',
        status: 'pending',
        date: new Date(),
        amount: 200,
        user: {
          id: '2',
          email: 'bob@gmail.com',
        },
      },
      {
        id: '3',
        type: 'outcome',
        status: 'failed',
        date: new Date(),
        amount: 300,
        user: {
          id: '3',
          email: 'alice@gmail.com',
        },
      },
    ],
  };
};

export const fetchTransactionsStatuses = async (transactions: ITransactionGet[]): Promise<WebApiResponse<ITransactionStatusGet[]>> => {
  return {
    isSuccess: true,
    data: transactions.map(transaction => ({
      id: transaction.id,
      status: transaction.status,
    })),
  };
};

export const commitTransaction = async (transaction: ITransactionPost): Promise<WebApiResponse<ITransactionGet>> => {
  return {
    isSuccess: true,
    data: {
      id: '4',
      date: new Date(),
      type: 'outcome',
      status: 'created',
      amount: transaction.amount,
      user: transaction.user,
    },
  };
};

export const fetchRecipients = async (): Promise<WebApiResponse<IUserGet[]>> => {
  return {
    isSuccess: true,
    data: [
      {
        id: '1',
        email: 'jack@gmail.com',
      },
      {
        id: '2',
        email: 'bob@gmail.com',
      },
      {
        id: '3',
        email: 'alice@gmail.com',
      },
    ],
  };
};

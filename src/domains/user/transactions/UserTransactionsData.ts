/** @format */

import { v4 as uuidv4 } from 'uuid';
import { WebApiResponse } from '../../../shared/types/WebApiTypes';
import { IUserTransactionGet, IUserTransactionPost, IUserTransactionStatusGet } from './UserTransactionsTypes';
import { IUserGet } from '../types/UserTypes';

export const fetchUserTransactions = async (): Promise<WebApiResponse<IUserTransactionGet[]>> => {
  return {
    isSuccess: true,

    data: [
      {
        id: uuidv4(),
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
        id: uuidv4(),
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
        id: uuidv4(),
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

export const fetchUserTransactionsStatuses = async (
  transactions: IUserTransactionGet[],
): Promise<WebApiResponse<IUserTransactionStatusGet[]>> => {
  return {
    isSuccess: true,
    data: transactions.map(transaction => ({
      id: transaction.id,
      status: 'completed',
    })),
  };
};

export const commitUserTransaction = async (transaction: IUserTransactionPost): Promise<WebApiResponse<IUserTransactionGet>> => {
  return {
    isSuccess: true,
    data: {
      id: uuidv4(),
      date: new Date(),
      type: 'outcome',
      status: 'pending',
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

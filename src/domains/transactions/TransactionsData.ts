/** @format */

import { randomUUID } from 'crypto';
import { WebApiResponse } from '../WebApiModels';
import { ITransactionGet, ITransactionPost } from './TransactionsModels';

export const fetchTransactions = async (): Promise<WebApiResponse<ITransactionGet[]>> => {
  return {
    isSuccess: true,
    data: [
      {
        id: randomUUID(),
        type: 'income',
        status: 'completed',
        date: new Date(),
        amount: 100,
        user: {
          id: randomUUID(),
          email: 'jack@gmail.com',
        },
      },
      {
        id: randomUUID(),
        type: 'outcome',
        status: 'pending',
        date: new Date(),
        amount: 200,
        user: {
          id: randomUUID(),
          email: 'bob@gmail.com',
        },
      },
      {
        id: randomUUID(),
        type: 'outcome',
        status: 'failed',
        date: new Date(),
        amount: 300,
        user: {
          id: randomUUID(),
          email: 'alice@gmail.com',
        },
      },
    ],
  };
};

export const commitTransaction = async (transaction: ITransactionPost): Promise<WebApiResponse<ITransactionGet>> => {
  return {
    isSuccess: true,
    data: {
      id: randomUUID(),
      date: new Date(),
      type: 'outcome',
      status: 'created',
      amount: transaction.amount,
      user: transaction.user,
    },
  };
};

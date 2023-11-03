/** @format */

import { randomUUID } from 'crypto';
import { IWebApiPostResponse } from '../WebApiInterfaces';
import { ITransactionGet, ITransactionPost } from './TransactionsInterfaces';

export const getTransactions = async (limit: number): Promise<ITransactionGet[]> => {
  return [
    {
      id: randomUUID(),
      status: 'pending',
      date: new Date(),
      amount: 100,
      to: {
        id: 2,
        email: 'Jane',
      },
    },
    {
      id: randomUUID(),
      status: 'pending',
      date: new Date(),
      amount: 200,
      to: {
        id: 3,
        email: 'Bob',
      },
    },
    {
      id: randomUUID(),
      status: 'pending',
      date: new Date(),
      amount: 300,
      to: {
        id: 4,
        email: 'Alice',
      },
    },
  ];
};

export const postTransaction = async (transaction: ITransactionPost): Promise<IWebApiPostResponse<ITransactionGet>> => {
  return {
    data: {
      id: randomUUID(),
      status: 'pending',
      date: new Date(),
      amount: transaction.amount,
      to: transaction.to,
    },
  };
};

/** @format */

import { ITransaction } from '../models/TransactionInterfaces';

export const fetchTransactions = async (limit: number): Promise<ITransaction[]> => {
  const data: ITransaction[] = [
    {
      id: 1,
      status: 'pending',
      date: '2021-01-01',
      amount: 100,
      from: {
        id: 1,
        name: 'John',
      },
      to: {
        id: 2,
        name: 'Jane',
      },
    },
    {
      id: 2,
      status: 'pending',
      date: '2021-01-02',
      amount: 200,
      from: {
        id: 1,
        name: 'John',
      },
      to: {
        id: 3,
        name: 'Bob',
      },
    },
    {
      id: 3,
      status: 'pending',
      date: '2021-01-03',
      amount: 300,
      from: {
        id: 1,
        name: 'John',
      },
      to: {
        id: 4,
        name: 'Alice',
      },
    },
  ];

  return data;
};

/** @format */

import { Transaction } from '../components/Transaction';
import { ITransaction } from '../models/TransactionInterfaces';

export const Transactions = () => {
  const transactions: ITransaction[] = [
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

  return (
    <div>
      <h1>Transactions</h1>
      <div className='flex justify-between items-center border-b-4 border-black p-2 text-gray-600 text-sm'>
        <span>date</span>
        <span>from</span>
        <span>amount</span>
        <span>to</span>
        <span>staus</span>
      </div>
      {transactions.map(x => (
        <Transaction key={x.id} transaction={x} />
      ))}
    </div>
  );
};

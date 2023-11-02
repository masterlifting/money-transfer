/** @format */

import { Transaction } from '../components/Transaction';
import { ITransaction } from '../models/TransactionInterfaces';

export const Transactions = () => {
  const transactions: ITransaction[] = [{ id: 1, staus: 'pending', date: '2021-01-01', amount: 100 }];
  return transactions.map(x => <Transaction key={x.id} transaction={x} />);
};

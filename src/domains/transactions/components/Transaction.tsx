/** @format */

import { useState } from 'react';
import { ITransaction } from '../models/TransactionInterfaces';
import { TransactionDetails } from './TransactionDetails';

interface ITransactionProps {
  transaction: ITransaction;
}

export const Transaction = ({ transaction }: ITransactionProps) => {
  const [details, setDetails] = useState(false);
  const className = `
  flex 
  justify-between 
  items-center 
  border-b-2 
  border-gray-200 
  p-2 
  text-gray-600 
  text-sm 
  hover:bg-gray-100 
  cursor-pointer 
  transition-all 
  duration-500 ease-in-out`;

  return (
    <div>
      <div onClick={() => setDetails(!details)} className={className}>
        <span>{transaction.date}</span>
        <span>{transaction.from.name}</span>
        <span>${transaction.amount}</span>
        <span>{transaction.to.name}</span>
        <span>{transaction.status}</span>
      </div>
      {details && <TransactionDetails />}
    </div>
  );
};

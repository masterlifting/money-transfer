/** @format */

import { useState } from 'react';
import { ITransaction } from '../models/TransactionInterfaces';
import { TransactionDetails } from './TransactionDetails';

interface ITransactionProps {
  transaction: ITransaction;
}

export const Transaction = ({ transaction }: ITransactionProps) => {
  const [details, setDetails] = useState(false);

  const transactionRowClassName = `
  flex 
  justify-between
  items-center
  p-2 
  rounded-md
  text-gray-600 
  text-sm 
  hover:bg-yellow-200 
  cursor-pointer 
  transition-all
  ${details ? 'bg-yellow-100' : ''}
  duration-500 ease-in-out`;

  const repeatButtonClassName = `
  bg-blue-300
  text-white
  p-1
  rounded-md
  hover:bg-blue-500`;

  return (
    <>
      <div className={transactionRowClassName} onClick={() => setDetails(!details)}>
        <span>{transaction.date}</span>
        <span>{transaction.from.name}</span>
        <span>${transaction.amount}</span>
        <span>{transaction.to.name}</span>
        <span>{transaction.status}</span>
        <button className={repeatButtonClassName}>repeat</button>
      </div>
      {details && <TransactionDetails />}
    </>
  );
};

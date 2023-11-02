/** @format */

import { ITransaction } from '../models/TransactionInterfaces';

interface ITransactionProps {
  transaction: ITransaction;
}

export const Transaction = ({ transaction }: ITransactionProps) => {
  return (
    <div className='flex justify-between items-center border-b-2 border-gray-200 py-2'>
      <div className='flex items-center'>
        <div className='flex flex-col'>
          <span className='text-gray-600 text-sm'>{transaction.date}</span>
          <span className='text-gray-600 text-sm'>{transaction.staus}</span>
        </div>
      </div>
      <div className='flex flex-col'>
        <span className='text-gray-600 text-sm'>{transaction.amount}</span>
      </div>
    </div>
  );
};

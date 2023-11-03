/** @format */

import { CustomError } from '../../../components/CustomError';
import { CustomLoader } from '../../../components/CustomLoader';
import { TransactionListItem } from './TransactionListItem';
import { useState } from 'react';
import { TransactionNew } from './TransactionNew';
import { CustomModal } from '../../../components/modal/CustomModal';
import { useTransactions } from '../hooks/TransactionHooks';
import { useCustomModal } from '../../../components/modal/CustomModalHooks';

export const TransactionList = () => {
  const modalTitle = 'New money transfer.';
  const { currentModalKey, isModalOpen, openModal } = useCustomModal();

  const { transactions, addTransaction, loading, error } = useTransactions();
  const [balance, setBalance] = useState(300);

  return (
    <div>
      <div className='flex justify-between items-center mb-2'>
        <h1 className='align-middle text-xl font-bold'>Transactions</h1>
        <div className='flex gap-2 align-middle text-xl font-bold'>
          <h1>Balance</h1>
          <p>{balance}</p>
        </div>
        <button className='w-20 bg-blue-300 text-white p-1 rounded-md hover:bg-green-300' onClick={() => openModal(modalTitle)}>
          New
        </button>
      </div>
      <div className='flex justify-between items-center border-b-2 border-black p-2 text-gray-600 text-sm'>
        <span>date</span>
        <span>from</span>
        <span>amount</span>
        <span>to</span>
        <span>status</span>
        <span></span>
      </div>
      <div>
        {loading && <CustomLoader />}
        {error && <CustomError message={error} />}
        {transactions.map(x => (
          <TransactionListItem key={x.id} transaction={x} addTransaction={addTransaction} />
        ))}
        {modalTitle === currentModalKey && isModalOpen && (
          <CustomModal title={modalTitle}>
            <TransactionNew addTransaction={addTransaction} />
          </CustomModal>
        )}
      </div>
    </div>
  );
};

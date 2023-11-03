/** @format */

import { useState } from 'react';
import { TransactionListItemDetails } from './TransactionListItemDetails';
import { CustomModal } from '../../../components/modal/CustomModal';
import { TransactionNew } from './TransactionNew';
import { ITransactionGet } from '../models/TransactionInterfaces';
import { useCustomModal } from '../../../components/modal/CustomModalHooks';

interface ITransactionProps {
  transaction: ITransactionGet;
  addTransaction: (transaction: ITransactionGet) => void;
}

export const TransactionListItem = ({ transaction, addTransaction }: ITransactionProps) => {
  const [details, setDetails] = useState(false);
  const modalTitle = 'Repetition of the money transfer.';
  const { currentModalKey, isModalOpen, openModal, closeModal } = useCustomModal();

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
      {modalTitle === currentModalKey && isModalOpen && (
        <CustomModal title='Repetition of the money transfer.' onClose={closeModal}>
          <TransactionNew transaction={transaction} addTransaction={addTransaction} />
        </CustomModal>
      )}
      <div className={transactionRowClassName} onClick={() => setDetails(!details)}>
        <span>{transaction.date}</span>
        <span>{transaction.from.name}</span>
        <span>${transaction.amount}</span>
        <span>{transaction.to.name}</span>
        <span>{transaction.status}</span>
        <button
          className={repeatButtonClassName}
          onClick={event => {
            event.stopPropagation();
            openModal(modalTitle);
          }}
        >
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1} stroke='currentColor' className='w-3 h-3'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99' />
          </svg>
        </button>
      </div>
      {details && <TransactionListItemDetails transactionId={transaction.id} />}
    </>
  );
};

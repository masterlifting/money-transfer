/** @format */

import { useState } from 'react';
import { TransactionListItemDetails } from './TransactionListItemDetails';
import { CustomModal } from '../../../components/modal/CustomModal';
import { TransactionCreate } from './TransactionCreate';
import { ITransactionGet } from '../TransactionsModels';
import { useCustomModal } from '../../../components/modal/CustomModalHooks';
import { SvgIcons } from '../../../shared/SvgIcons';

interface ITransactionProps {
  transaction: ITransactionGet;
  addTransaction: (transaction: ITransactionGet) => void;
}

const Style = {
  repeatButton: `
  bg-blue-300
  text-white
  p-1
  rounded-md
  hover:bg-blue-500`,

  transactionRow: (withDetails: boolean) => `
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
  ${withDetails ? 'bg-yellow-100' : ''}
  duration-500 ease-in-out`,
};

export const TransactionListItem = ({ transaction, addTransaction }: ITransactionProps) => {
  const modalTitle = 'Repetition of the money transfer.';

  const [showDetails, setShowDetails] = useState(false);
  const { openModal, closeModal } = useCustomModal();

  return (
    <>
      <CustomModal title={modalTitle} onClose={closeModal}>
        <TransactionCreate transaction={transaction} addTransaction={addTransaction} />
      </CustomModal>

      <div className={Style.transactionRow(showDetails)} onClick={() => setShowDetails(!showDetails)}>
        <span>{transaction.date}</span>
        <span>{transaction.from.email}</span>
        <span>${transaction.amount}</span>
        <span>{transaction.user.email}</span>
        <span>{transaction.status}</span>

        <button
          className={Style.repeatButton}
          onClick={event => {
            event.stopPropagation();
            openModal(modalTitle);
          }}
        >
          {SvgIcons.repeat}
        </button>
      </div>

      {showDetails && <TransactionListItemDetails transactionId={transaction.id} />}
    </>
  );
};

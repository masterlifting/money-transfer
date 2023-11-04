/** @format */

import { useState } from 'react';
import { TransactionListItemDetails } from './TransactionListItemDetails';
import { TransactionCreate } from './TransactionCreate';
import { ITransactionGet } from '../TransactionTypes';
import { SvgIcons } from '../../../shared/SvgIcons';
import { useCustomModal } from '../../../shared/modal/CustomModalHooks';
import { CustomModal } from '../../../shared/modal/CustomModal';
import { ButtonStyle } from '../../../styles/Buttons';

interface ITransactionProps {
  transaction: ITransactionGet;
  updateTransactions: (transaction: ITransactionGet) => void;
}

export const TransactionListItem = ({ transaction, updateTransactions }: ITransactionProps) => {
  const modalTitle = 'Repetition of the money transfer.';

  const [showDetails, setShowDetails] = useState(false);
  const { openModal, closeModal } = useCustomModal();

  return (
    <>
      <CustomModal title={modalTitle} onClose={closeModal}>
        <TransactionCreate transaction={transaction} updateTransactions={updateTransactions} />
      </CustomModal>

      <div
        className={`
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
          ${showDetails ? 'bg-yellow-100' : ''}
          duration-500 ease-in-out`}
        onClick={() => setShowDetails(!showDetails)}
      >
        <span>{transaction.date.toDateString()}</span>
        <span>${transaction.amount}</span>
        <span>
          {transaction.type === 'income' ? 'from' : 'to'} {transaction.user.email}
        </span>
        <span>{transaction.status}</span>

        {transaction.type === 'outcome' ? (
          <button
            className={ButtonStyle.info}
            onClick={event => {
              event.stopPropagation();
              openModal(modalTitle);
            }}
          >
            {SvgIcons.repeat}
          </button>
        ) : (
          <span></span>
        )}
      </div>

      {showDetails && <TransactionListItemDetails transactionId={transaction.id} />}
    </>
  );
};

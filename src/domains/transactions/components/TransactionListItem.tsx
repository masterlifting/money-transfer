/** @format */

import { useState } from 'react';
import { TransactionListItemDetails } from './TransactionListItemDetails';
import { TransactionCreate } from './TransactionCreate';
import { ITransactionGet } from '../TransactionTypes';
import { SvgIcons } from '../../../shared/icons/SvgIcons';
import { useCustomModal } from '../../../shared/modals/CustomModalHooks';
import { CustomModal } from '../../../shared/modals/CustomModal';
import { ButtonStyle } from '../../../styles/Buttons';

interface ITransactionProps {
  transaction: ITransactionGet;
  updateTransactions: (transaction: ITransactionGet) => void;
}

export const TransactionListItem = ({ transaction, updateTransactions }: ITransactionProps) => {
  const modalTitle = `Repeat transfer for ${transaction.user.email}`;

  const [showDetails, setShowDetails] = useState(false);
  const { openModal, closeModal } = useCustomModal();

  return (
    <>
      <CustomModal title={modalTitle} onClose={closeModal}>
        <TransactionCreate transaction={transaction} updateTransactions={updateTransactions} />
      </CustomModal>

      <tr
        className={`
        h-8
        hover:bg-gray-100
        cursor-pointer
        `}
        onClick={() => setShowDetails(!showDetails)}
      >
        <td className='text-left'>{transaction.date.toDateString()}</td>
        <td className='text-left'>${transaction.amount}</td>
        <td className='text-left'>{transaction.type}</td>
        <td className='text-left'>{transaction.user.email}</td>
        <td className='text-left'>{transaction.status}</td>
        <td className='text-left'>
          {transaction.type === 'outcome' ? (
            <button
              className={ButtonStyle.success}
              onClick={event => {
                event.stopPropagation();
                openModal(modalTitle);
              }}
            >
              {SvgIcons.repeat}
            </button>
          ) : null}
        </td>
      </tr>
      <tr>{showDetails && <TransactionListItemDetails transactionId={transaction.id} />}</tr>
    </>
  );
};

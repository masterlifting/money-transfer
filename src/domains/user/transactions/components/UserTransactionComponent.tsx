/** @format */

import { useState } from 'react';
import { IUserTransactionGet } from '../UserTransactionsTypes';
import { useModal } from '../../../../shared/components/modals/ModalHooks';
import { Modal } from '../../../../shared/components/modals/ModalComponent';
import { UserTransactionCreate } from './UserTransactionCreateComponent';
import { UserTransactionDetails } from './UserTransactionDetailsComponent';
import { SvgIcon } from '../../../../shared/components/icons/SvgIconComponent';
import { SvgIcons } from '../../../../shared/components/icons/SvgIcons';

interface ITransactionProps {
  transaction: IUserTransactionGet;
  updateTransactions: (transaction: IUserTransactionGet) => void;
}

export const UserTransaction = ({ transaction, updateTransactions }: ITransactionProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const { openModal, closeModal } = useModal();

  return (
    <div className='border-b-2 border-gray transition-all duration-500'>
      <Modal id={transaction.id} title={`Repeat transfer for ${transaction.user.email}`} onClose={closeModal}>
        <UserTransactionCreate transaction={transaction} updateTransactions={updateTransactions} />
      </Modal>
      <div
        className='grid grid-cols-[20%_15%_10%_35%_15%_5%] gap-2 py-1 cursor-pointer hover:bg-gray-100'
        onClick={() => setShowDetails(!showDetails)}
      >
        <span>{transaction.date.toDateString()}</span>
        <span>${transaction.amount}</span>
        <span>{transaction.type === 'outcome' ? 'to' : 'from'}</span>
        <span>{transaction.user.email}</span>
        <span>{transaction.status}</span>
        <div className='flex justify-end items-center'>
          {transaction.type === 'outcome' ? (
            <SvgIcon icon={SvgIcons.Repeat} handleClick={() => openModal(transaction.id)} />
          ) : null}
        </div>
      </div>
      {showDetails && <UserTransactionDetails transactionId={transaction.id} />}
    </div>
  );
};

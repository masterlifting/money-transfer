/** @format */

import { useState } from 'react';
import { IUserTransactionGet } from '../UserTransactionsTypes';
import { useModalContext } from '../../../shared/components/modals/ModalHooks';
import { Modal } from '../../../shared/components/modals/ModalComponent';
import { UserTransactionCreate } from './UserTransactionCreateComponent';
import { UserTransactionDetails } from './UserTransactionDetailsComponent';
import { SvgIcon } from '../../../shared/components/icons/SvgIconComponent';
import { SvgIcons } from '../../../shared/components/icons/SvgIcons';
import { IAuthUserGet } from '../../auth/AuthTypes';
import { TextColor } from '../../../shared/styles/Colors';

interface ITransactionProps {
  user: IAuthUserGet;
  transaction: IUserTransactionGet;
}

export const UserTransaction = ({ user, transaction }: ITransactionProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const { openModal, closeModal } = useModalContext();

  return (
    <div className='border-b-2 border-gray'>
      <Modal id={transaction.id} title={`Repeat transfer for ${transaction.user.email}`} onClose={closeModal}>
        <UserTransactionCreate user={user} transaction={transaction} />
      </Modal>
      <div
        className='grid grid-cols-[20%_15%_10%_35%_15%_5%] gap-2 py-1 cursor-pointer hover:bg-gray-100'
        onClick={() => setShowDetails(!showDetails)}
      >
        <span>
          {transaction.date.toLocaleString('en-US', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })}
        </span>
        <span
          className={transaction.type === 'Income' ? TextColor.Success : TextColor.Danger}
        >{`${transaction.amount.value}${transaction.amount.symbol}`}</span>
        <span>{transaction.type === 'Outcome' ? 'to' : 'from'}</span>
        <span>{transaction.user.email}</span>
        <span
          className={(() => {
            switch (transaction.status) {
              case 'Pending':
                return TextColor.Warning;
              case 'Completed':
                return TextColor.Success;
              case 'Failed':
                return TextColor.Danger;
              default:
                return '';
            }
          })()}
        >
          {transaction.status}
        </span>
        <div className='flex justify-end items-center'>
          {transaction.type === 'Outcome' && <SvgIcon icon={SvgIcons.Repeat} handleClick={() => openModal(transaction.id)} />}
        </div>
      </div>
      {showDetails && <UserTransactionDetails transactionId={transaction.id} description={transaction.description} />}
    </div>
  );
};

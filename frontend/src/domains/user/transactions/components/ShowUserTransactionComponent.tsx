/** @format */

import React from 'react';
import { UserTransactionStatusType } from '../../../../../../shared/types';
import { IUserTransaction, IUser } from '../../../interfaces';
import { useState } from 'react';
import { Modal } from '../../../../shared/components/modals/ModalComponent';
import { SvgIcon } from '../../../../shared/components/icons/SvgIconComponent';
import { SvgIcons } from '../../../../shared/components/icons/SvgIcons';
import { TextColor } from '../../../../shared/styles/colors';
import { useAppActions } from '../../../../shared/hooks/useAppActions';
import { CreateUserTransaction } from './CreateUserTransactionComponent';
import { ShowUserTransactionDetails } from './ShowUserTransactionDetailsComponent';

interface ITransactionProps {
  user: IUser;
  transaction: IUserTransaction;
}

export const ShowUserTransaction = ({ user, transaction }: ITransactionProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const { openModal, closeModal } = useAppActions();

  return (
    <div className='border-b-2 border-gray'>
      {transaction.type === 'Outcome' ? (
        <Modal id={transaction.id} title='Repeat money transfer' onClose={closeModal}>
          <CreateUserTransaction user={user} transaction={transaction} />
        </Modal>
      ) : null}

      <div
        className='grid grid-cols-[20%_15%_10%_35%_15%_5%] gap-2 py-1 cursor-pointer hover:bg-gray-100'
        onClick={() => setShowDetails(!showDetails)}
      >
        <span>{formatDate(transaction.date)}</span>
        <span
          className={transaction.type === 'Income' ? TextColor.Success : TextColor.Danger}
        >{`${transaction.amount.value}${transaction.amount.symbol}`}</span>
        <span>{transaction.type === 'Outcome' ? 'to' : 'from'}</span>
        <span>{transaction.user.email}</span>
        <span className={getTransactionStatusColor(transaction.status)}>{transaction.status}</span>
        <div className='flex justify-end items-center'>
          {transaction.type === 'Outcome' && (
            <SvgIcon icon={SvgIcons.Repeat} title='Repeat transfer' handleClick={() => openModal(transaction.id)} />
          )}
        </div>
      </div>
      {showDetails && <ShowUserTransactionDetails transactionId={transaction.id} description={transaction.description} />}
    </div>
  );
};

const formatDate = (dateString: any) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 because months are 0-indexed
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');

  return `${year}.${month}.${day} ${hour}:${minute}`;
};

const getTransactionStatusColor = (status: UserTransactionStatusType) => {
  switch (status) {
    case 'Pending':
      return TextColor.Warning;
    case 'Completed':
      return TextColor.Success;
    case 'Failed':
      return TextColor.Danger;
    default:
      return '';
  }
};

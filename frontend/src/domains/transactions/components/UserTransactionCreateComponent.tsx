/** @format */

import { Error } from '../../../shared/components/errors/ErrorComponent';
import { useModalContext } from '../../../shared/components/modals/modalHooks';
import { ButtonClass } from '../../../shared/styles/button';
import { TextColor } from '../../../shared/styles/colors';
import { InputClass } from '../../../shared/styles/input';
import { IAuthUserGet } from '../../../../../shared/types/authTypes';
import { useTransactionCreate } from '../transactionsHooks';
import { IUserTransactionGet } from '../../../../../shared/types/userTransactionsTypes';
import React from 'react';

interface ITransactionProps {
  user: IAuthUserGet;
  transaction?: IUserTransactionGet;
}

export const UserTransactionCreate = ({ user, transaction }: ITransactionProps) => {
  const { closeModal } = useModalContext();
  const {
    userTransactionPostModel,
    userTransactionRecipients,
    userTransactionCreateValidationResult,
    onChangeAmountUserTransactionCreate,
    onChangeRecipientUserTransactionCreate,
    onSubmitUserTransactionCreate,
  } = useTransactionCreate(user, transaction);

  return (
    <form onSubmit={onSubmitUserTransactionCreate}>
      {!userTransactionCreateValidationResult.isValid && <Error error={userTransactionCreateValidationResult} />}
      <div className='grid grid-cols-[30%_70%] gap-2'>
        <div className='grid grid-row-2'>
          <label className={TextColor.Secondary + 'text-sm'}>{transaction?.amount.symbol} amount</label>
          <input
            className={InputClass.Text}
            type='number'
            placeholder='Amount'
            value={userTransactionPostModel.amount.value}
            onChange={onChangeAmountUserTransactionCreate}
          />
        </div>
        <div className='grid grid-row-2'>
          <label className={TextColor.Secondary + 'text-sm'}>recipient</label>
          <select
            title='Choose a recipient'
            className={InputClass.Select}
            value={userTransactionPostModel.user.id}
            onChange={onChangeRecipientUserTransactionCreate}
            placeholder='Choose a recipient'
          >
            <option style={{ color: 'red' }} value=''>
              Choose a recipient
            </option>

            {userTransactionRecipients.map(x => (
              <option key={x.id} value={x.id}>
                {x.email}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='flex justify-end gap-2'>
        <button className={ButtonClass.Secondary} onClick={closeModal}>
          Close
        </button>
        <button
          title={!userTransactionCreateValidationResult.isValid ? 'Fill in all fields' : undefined}
          disabled={!userTransactionCreateValidationResult.isValid}
          className={userTransactionCreateValidationResult.isValid ? ButtonClass.Success : ButtonClass.Disable}
        >
          Commit
        </button>
      </div>
    </form>
  );
};

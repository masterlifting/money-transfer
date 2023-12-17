/** @format */

import { IUser, IUserTransaction } from '../../../interfaces';
import { Error } from '../../../../shared/components/errors/ErrorComponent';
import { ButtonClass } from '../../../../shared/styles/button';
import { TextColor } from '../../../../shared/styles/colors';
import { InputClass } from '../../../../shared/styles/input';
import React from 'react';
import { CircleLoader } from '../../../../shared/components/loaders/CircleLoaderComponents';
import { useCreateUserTransaction } from '../userUserTransactionsHooks';

interface ITransactionProps {
  user: IUser;
  transaction?: IUserTransaction;
}

export const CreateUserTransaction = ({ user, transaction }: ITransactionProps) => {
  const { isLoading, newTransaction, recepients, validationResult, closeModal, onChangeAmount, onChangeRecipient, onSubmit } =
    useCreateUserTransaction(user, transaction);

  return (
    <form onSubmit={onSubmit}>
      {isLoading ? (
        <CircleLoader />
      ) : (
        <>
          {!validationResult.isValid && <Error error={validationResult} />}
          <div className='grid grid-cols-[30%_70%] gap-2'>
            <div className='grid grid-row-2'>
              <label className={TextColor.Secondary + 'text-sm'}>{transaction?.amount.symbol} amount</label>
              <input
                className={InputClass.Text}
                type='number'
                placeholder='Amount'
                value={newTransaction.amount.value}
                onChange={onChangeAmount}
              />
            </div>
            <div className='grid grid-row-2'>
              <label className={TextColor.Secondary + 'text-sm'}>recipient</label>
              <select
                title='Choose a recipient'
                className={InputClass.Select}
                value={newTransaction.user.id}
                onChange={onChangeRecipient}
                placeholder='Choose a recipient'
              >
                <option style={{ color: 'red' }} value=''>
                  Choose a recipient
                </option>

                {recepients.map(x => (
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
              title={!validationResult.isValid ? 'Fill in all fields' : undefined}
              disabled={!validationResult.isValid}
              className={validationResult.isValid ? ButtonClass.Success : ButtonClass.Disable}
            >
              Commit
            </button>
          </div>
        </>
      )}
    </form>
  );
};

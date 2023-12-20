/** @format */

import React from 'react';
import { IUser, IUserTransaction } from '../../../interfaces';
import { Error } from '../../../../shared/components/errors/ErrorComponent';
import { ButtonClass } from '../../../../shared/styles/button';
import { InputClass } from '../../../../shared/styles/input';
import { CircleLoader } from '../../../../shared/components/loaders/CircleLoaderComponents';
import { useCreateUserTransaction } from '../userUserTransactionsHooks';
import { SubmitButton } from '../../../../shared/components/buttons/SubmitButtonComponent';
import { TextColor } from '../../../../shared/styles/colors';

interface ITransactionProps {
  user: IUser;
  transaction?: IUserTransaction;
}

export const CreateUserTransaction = ({ user, transaction }: ITransactionProps) => {
  const {
    isLoading,
    newTransaction,
    recepients,
    validationResult,
    closeModal,
    onChangeAmount,
    onChangeRecipient,
    onChangeDescription,
    onSubmit,
  } = useCreateUserTransaction(user, transaction);

  return (
    <form onSubmit={onSubmit}>
      {isLoading ? (
        <CircleLoader />
      ) : (
        <>
          {!validationResult.isValid && <Error error={validationResult} />}
          <div className='grid grid-cols-[30%_5%_65%] justify-items-center align-middle'>
            <input
              name='amount'
              title={`Amount in ${newTransaction.amount.symbol}`}
              type='number'
              placeholder='Amount'
              className={InputClass.Text}
              value={newTransaction.amount.value}
              onChange={onChangeAmount}
            />
            <span className={`${TextColor.Secondary} my-1 py-1`}>{newTransaction.amount.symbol}</span>
            <select
              name='recipient'
              title='Transfer to'
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
          <textarea
            className={InputClass.Text}
            name='description'
            title='Recipient and you will see it in the details'
            placeholder='Description for the transfer'
            value={newTransaction.description}
            onChange={onChangeDescription}
          />
          <div className='flex justify-end gap-2'>
            <button type='button' className={ButtonClass.Secondary} onClick={closeModal}>
              Close
            </button>
            <SubmitButton validationResult={validationResult} name='Commit' />
          </div>
        </>
      )}
    </form>
  );
};

/** @format */

import React from 'react';
import { IUser, IUserTransaction } from '../../../interfaces';
import { Error } from '../../../../shared/components/errors/ErrorComponent';
import { ButtonClass } from '../../../../shared/styles/button';
import { InputClass } from '../../../../shared/styles/input';
import { useCreateUserTransaction } from '../userUserTransactionsHooks';
import { SubmitButton } from '../../../../shared/components/buttons/SubmitButtonComponent';
import { TextColor } from '../../../../shared/styles/colors';
import { AutoComplete } from '../../../../shared/components/dropdowns/AutoCompleteComponent';

interface ITransactionProps {
  user: IUser;
  transaction?: IUserTransaction;
}

export const CreateUserTransaction = ({ user, transaction }: ITransactionProps) => {
  const {
    isLoading,
    newTransaction,
    validationResult,
    searchRecipientEmails,
    closeModal,
    onChangeAmount,
    onChangeRecipient,
    onChangeDescription,
    onSubmit,
  } = useCreateUserTransaction(user, transaction);

  return (
    <form onSubmit={onSubmit}>
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
        <AutoComplete
          title='recipient'
          state={newTransaction.user.email}
          setState={onChangeRecipient}
          searchFunc={searchRecipientEmails}
        />
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
        <SubmitButton isLoading={isLoading} validationResult={validationResult} name='Commit' />
      </div>
    </form>
  );
};

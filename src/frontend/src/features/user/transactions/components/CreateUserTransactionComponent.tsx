/** @format */

import React from 'react';
import { SubmitButton } from '../../../../components/buttons/SubmitButtonComponent';
import { AutoComplete } from '../../../../components/dropdowns/AutoCompleteComponent';
import { Error } from '../../../../components/errors/ErrorComponent';
import { ButtonClass } from '../../../../styles/button';
import { TextColor } from '../../../../styles/colors';
import { InputClass } from '../../../../styles/input';
import { IUser } from '../../../auth/authTypes';
import { useCreateUserTransaction } from '../userTransactionsHooks';
import { IUserTransaction } from '../userTransactionsTypes';

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

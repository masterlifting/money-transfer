/** @format */

import { ValidationError } from '../../../../shared/components/errors/ErrorValidationComponent';
import { useModal } from '../../../../shared/components/modals/ModalHooks';
import { ButtonStyle } from '../../../../shared/styles/Button';
import { InputSelectStyle, InputTextStyle } from '../../../../shared/styles/Input';
import { useTransactionCreate } from '../UserTransactionsHooks';
import { IUserTransactionGet } from '../UserTransactionsTypes';

interface ITransactionProps {
  transaction?: IUserTransactionGet;
  updateTransactions: (transaction: IUserTransactionGet) => void;
}

export const UserTransactionCreate = ({ transaction, updateTransactions }: ITransactionProps) => {
  const { closeModal } = useModal();
  const { transactionPost, recipients, validation, onChangeAmount, onChangeRecipient, onSubmit } = useTransactionCreate(
    transaction,
    updateTransactions,
  );

  return (
    <form onSubmit={onSubmit}>
      {!validation.isValid && <ValidationError message={validation.message} />}
      <div className='grid grid-cols-[30%_70%] gap-2'>
        <input
          className={InputTextStyle.Text}
          type='number'
          placeholder='Amount'
          value={transactionPost.amount}
          onChange={onChangeAmount}
        />
        <select
          title='Choose a recipient'
          className={InputSelectStyle.Base}
          value={transactionPost.user.id}
          onChange={onChangeRecipient}
          placeholder='Choose a recipient'
        >
          {recipients.map(x => (
            <option className={InputSelectStyle.Option} key={x.id} value={x.id}>
              {x.email}
            </option>
          ))}
        </select>
      </div>
      <div className='flex justify-end gap-2'>
        <button className={ButtonStyle.Secondary} onClick={closeModal}>
          Close
        </button>
        <button disabled={!validation.isValid} className={validation.isValid ? ButtonStyle.Success : ButtonStyle.Disable}>
          Commit
        </button>
      </div>
    </form>
  );
};

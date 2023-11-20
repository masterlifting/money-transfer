/** @format */

import { ITransactionGet } from '../TransactionTypes';
import { useCustomModal } from '../../../shared/modals/CustomModalHooks';
import { ValidationError } from '../../../shared/errors/ErrorComponents';
import { useTransactionCreate } from '../TransactionsHooks';
import { buttonStyle } from '../../../styles/Button';
import { inputStyle } from '../../../styles/Input';

interface ITransactionProps {
  transaction?: ITransactionGet;
  updateTransactions: (transaction: ITransactionGet) => void;
}

export const TransactionCreate = ({ transaction, updateTransactions }: ITransactionProps) => {
  const { closeModal } = useCustomModal();
  const { transactionPost, recipients, validation, onChangeAmount, onChangeRecipient, onSubmit } = useTransactionCreate(
    transaction,
    updateTransactions,
  );

  return (
    <form onSubmit={onSubmit}>
      {!validation.isValid && <ValidationError message={validation.message} />}
      <div className='flex gap-2'>
        <input
          className={'w-20 ' + inputStyle.text}
          type='number'
          placeholder='Amount'
          value={transactionPost.amount}
          onChange={onChangeAmount}
        />
        <select
          title='Choose a recipient'
          className={inputStyle.select.base + 'w-60'}
          value={transactionPost.user.id}
          onChange={onChangeRecipient}
          placeholder='Choose a recipient'
        >
          {recipients.map(x => (
            <option key={x.id} value={x.id}>
              {x.email}
            </option>
          ))}
        </select>
      </div>
      <div className='flex justify-end gap-2'>
        <button className={buttonStyle.secondary} onClick={closeModal}>
          Close
        </button>
        <button disabled={!validation.isValid} className={validation.isValid ? buttonStyle.success : buttonStyle.disable}>
          Commit
        </button>
      </div>
    </form>
  );
};

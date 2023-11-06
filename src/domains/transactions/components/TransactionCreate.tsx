/** @format */

import { ITransactionGet } from '../TransactionTypes';
import { useCustomModal } from '../../../shared/modals/CustomModalHooks';
import { ValidationError } from '../../../shared/errors/ErrorComponents';
import { useTransactionCreate } from '../TransactionsHooks';
import { ButtonStyle } from '../../../styles/Buttons';
import { InputStyle } from '../../../styles/Inputs';

interface ITransactionProps {
  transaction?: ITransactionGet;
  updateTransactions: (transaction: ITransactionGet) => void;
}

export const TransactionCreate = ({ transaction, updateTransactions }: ITransactionProps) => {
  const { closeModal } = useCustomModal();
  const { transactionPost, recipients, validation, onChangeAmount, onChangeRecipient, onSubmit } = useTransactionCreate(transaction, updateTransactions);

  return (
    <form onSubmit={onSubmit}>
      {!validation.isValid && <ValidationError message={validation.message} />}
      <div className='flex gap-2'>
        <input className={'w-20 ' + InputStyle.text} type='number' placeholder='Amount' value={transactionPost.amount} onChange={onChangeAmount} />
        <select className={'w-60 cursor-pointer ' + InputStyle.text} value={transactionPost.user.id} onChange={onChangeRecipient} placeholder='Choose a recipient'>
          <option value=''>Choose a recipient</option>
          {recipients.map(x => (
            <option key={x.id} value={x.id}>
              {x.email}
            </option>
          ))}
        </select>
      </div>
      <div className='flex justify-end gap-2'>
        <button className={ButtonStyle.secondary} onClick={closeModal}>
          Close
        </button>
        <button disabled={!validation.isValid} className={validation.isValid ? ButtonStyle.success : ButtonStyle.disable}>
          Commit
        </button>
      </div>
    </form>
  );
};

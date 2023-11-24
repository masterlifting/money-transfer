/** @format */

import { Error } from '../../../../shared/components/errors/ErrorComponent';
import { useModalContext } from '../../../../shared/components/modals/ModalHooks';
import { ButtonStyle } from '../../../../shared/styles/Button';
import { InputSelectStyle, InputTextStyle } from '../../../../shared/styles/Input';
import { IAuthUserGet } from '../../../auth/AuthTypes';
import { useUserTransactionCreate } from '../UserTransactionsHooks';
import { IUserTransactionGet } from '../UserTransactionsTypes';

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
  } = useUserTransactionCreate(user, transaction);

  return (
    <form onSubmit={onSubmitUserTransactionCreate}>
      {!userTransactionCreateValidationResult.isValid && <Error error={userTransactionCreateValidationResult} />}
      <div className='grid grid-cols-[30%_70%] gap-2'>
        <div className='grid grid-row-2'>
          <label className='text-gray-400'>amount</label>
          <input
            className={InputTextStyle.Text}
            type='number'
            placeholder='Amount'
            value={userTransactionPostModel.amount}
            onChange={onChangeAmountUserTransactionCreate}
          />
        </div>
        <div className='grid grid-row-2'>
          <label className='text-gray-400'>recipient</label>
          <select
            title='Choose a recipient'
            className={InputSelectStyle.Base}
            value={userTransactionPostModel.user.id}
            onChange={onChangeRecipientUserTransactionCreate}
            placeholder='Choose a recipient'
          >
            <option className={InputSelectStyle.Option} style={{ color: 'red' }} value=''>
              Choose a recipient
            </option>

            {userTransactionRecipients.map(x => (
              <option className={InputSelectStyle.Option} key={x.id} value={x.id}>
                {x.email}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='flex justify-end gap-2'>
        <button className={ButtonStyle.Secondary} onClick={closeModal}>
          Close
        </button>
        <button
          disabled={!userTransactionCreateValidationResult.isValid}
          className={userTransactionCreateValidationResult.isValid ? ButtonStyle.Success : ButtonStyle.Disable}
        >
          Commit
        </button>
      </div>
    </form>
  );
};

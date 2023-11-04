/** @format */

import { useState } from 'react';
import { ITransactionGet, ITransactionPost } from '../TransactionsModels';
import { CustomError } from '../../../components/CustomError';
import { commitTransaction } from '../TransactionsData';
import { useCustomModal } from '../../../components/modal/CustomModalHooks';

interface ITransactionProps {
  transaction?: ITransactionGet;
  addTransaction: (transaction: ITransactionGet) => void;
}

export const TransactionCreate = ({ transaction, addTransaction }: ITransactionProps) => {
  const { closeModal } = useCustomModal();

  const [transactionPost, setTransactionPost] = useState<ITransactionPost>({
    amount: transaction?.amount || 0,
    user: {
      id: transaction?.user.id || '',
      email: transaction?.user.email || '',
    },
  });

  const [amount, setAmount] = useState(transaction?.amount);

  const validationErrorInitial = amount === undefined;

  const [validationError, setValidationError] = useState<string | null>(validationErrorInitial ? 'Fill the form' : null);

  const buttonClassName = 'w-20 text-white p-1 rounded-md';
  const commitButtonClassName = `${buttonClassName} ${validationError === null ? 'bg-blue-300 hover:bg-green-300' : 'bg-gray-300 disabled:cursor-not-allowed'}`;
  const closeButtonClassName = `${buttonClassName} bg-gray-300 hover:bg-gray-500`;
  const inputClassName = 'w-40 border p-2 m-2 outline-0 rounded-md';

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    setValidationError(null);

    event.preventDefault();

    const newTransactionResponse = await commitTransaction({ from, user: to, amount } as ITransactionPost);

    if (newTransactionResponse.isSuccess) {
      closeModal();
      addTransaction(newTransactionResponse.data as ITransactionGet);
    } else {
      setValidationError(newTransactionResponse.error!);
    }
  };

  const onAmountHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value && isNaN(Number(value))) {
      setValidationError('Amount must be a number');
      return;
    }

    setAmount(Number(value));
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='flex justify-between items-center mb-2'>
        <input className={inputClassName} type='text' placeholder='Enter amount' value={amount} onChange={onAmountHandler} />
        <input className={inputClassName} type='text' placeholder='From' value={transaction?.from.email} />
        <input className={inputClassName} type='text' placeholder='To' value={transaction?.user.email} />
      </div>
      {validationError !== null && <CustomError message={validationError} />}
      <div className='flex justify-end gap-2'>
        <button className={closeButtonClassName} onClick={closeModal}>
          Close
        </button>
        <button disabled={validationError !== null} className={commitButtonClassName}>
          Commit
        </button>
      </div>
    </form>
  );
};

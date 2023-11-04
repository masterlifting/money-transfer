/** @format */

import { CustomError } from '../../../shared/CustomError';
import { CustomLoader } from '../../../shared/CustomLoader';
import { CustomModal } from '../../../shared/modal/CustomModal';
import { useCustomModal } from '../../../shared/modal/CustomModalHooks';
import { useTransactions } from '../TransactionsHooks';
import { TransactionCreate } from './TransactionCreate';
import { TransactionListItem } from './TransactionListItem';

export const TransactionList = () => {
  const newTransaction = 'New money transfer.';
  const { openModal } = useCustomModal();

  const { transactions, addTransaction, loading, error } = useTransactions();

  return (
    <div>
      <CustomModal title={newTransaction}>
        <TransactionCreate addTransaction={addTransaction} />
      </CustomModal>

      <div className='flex justify-between items-center mb-2'>
        <h1 className='align-middle text-xl font-bold'>Transactions</h1>
        <button className='w-20 bg-blue-300 text-white p-1 rounded-md hover:bg-green-300' onClick={() => openModal(newTransaction)}>
          New
        </button>
      </div>
      <div className='flex justify-between items-center border-b-2 border-black p-2 text-gray-600 text-sm'>
        <span>date</span>
        <span>from</span>
        <span>amount</span>
        <span>to</span>
        <span>status</span>
        <span></span>
      </div>
      <div>
        {loading && <CustomLoader />}
        {error && <CustomError message={error} />}
        {transactions.map(x => (
          <TransactionListItem key={x.id} transaction={x} addTransaction={addTransaction} />
        ))}
      </div>
    </div>
  );
};

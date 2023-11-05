/** @format */

import { ValidationError } from '../../../shared/errors/ErrorComponents';
import { CircleLoader } from '../../../shared/loaders/LoaderComponents';
import { CustomModal } from '../../../shared/modals/CustomModal';
import { useCustomModal } from '../../../shared/modals/CustomModalHooks';
import { useTransactionList } from '../TransactionsHooks';
import { TransactionCreate } from './TransactionCreate';
import { TransactionListItem } from './TransactionListItem';

export const TransactionList = () => {
  const newTransaction = 'New money transfer.';
  const { openModal } = useCustomModal();

  const { transactions, updateTransactions, loading, error } = useTransactionList();

  return (
    <div>
      <CustomModal title={newTransaction}>
        <TransactionCreate updateTransactions={updateTransactions} />
      </CustomModal>

      <div className='flex justify-between items-center mb-2'>
        <h1 className='align-middle text-xl font-bold'>Transactions</h1>
        <button className='w-20 bg-blue-300 text-white p-1 rounded-md hover:bg-green-300' onClick={() => openModal(newTransaction)}>
          New
        </button>
      </div>
      <table className='table-auto w-full'>
        <thead>
          <tr className='border-b-2 border-black'>
            <th className='text-left'>date</th>
            <th className='text-left'>amount</th>
            <th className='text-left'>type</th>
            <th className='text-left'>user</th>
            <th className='text-left'>status</th>
            <th className='text-left'></th>
          </tr>
        </thead>
        <tbody>
          {loading && <CircleLoader />}
          {error && <ValidationError message={error} />}
          {transactions.map(x => (
            <TransactionListItem key={x.id} transaction={x} updateTransactions={updateTransactions} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

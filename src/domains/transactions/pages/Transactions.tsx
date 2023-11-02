/** @format */

import { Error } from '../../../components/Error';
import { Loader } from '../../../components/Loader';
import { Modal } from '../../../components/Modal';
import { Transaction } from '../components/Transaction';
import { useTransactions } from '../hooks/transactionHooks';

export const Transactions = () => {
  const { transactions, loading, error } = useTransactions();

  return (
    <div>
      <h1>Transactions</h1>
      <div className='flex justify-between items-center border-b-2 border-black p-2 text-gray-600 text-sm'>
        <span>date</span>
        <span>from</span>
        <span>amount</span>
        <span>to</span>
        <span>status</span>
        <span></span>
      </div>
      <div>
        {loading && <Loader />}
        {error && <Error message={error} />}
        {transactions.map(x => (
          <Transaction key={x.id} transaction={x} />
        ))}
      </div>
    </div>
  );
};

/** @format */

import { SimpleError } from '../../../../shared/components/errors/ErrorSimpleComponent';
import { CircleLoader } from '../../../../shared/components/loaders/CircleLoaderComponents';
import { Modal } from '../../../../shared/components/modals/ModalComponent';
import { useModal } from '../../../../shared/components/modals/ModalHooks';
import { Paginator } from '../../../../shared/components/paginators/PaginationComponent';
import { ButtonStyle } from '../../../../shared/styles/Button';
import { useTransactions } from '../UserTransactionsHooks';
import { UserTransaction } from './UserTransactionComponent';
import { UserTransactionCreate } from './UserTransactionCreateComponent';

export const UserTransactions = () => {
  const newTransaction = 'New money transfer.';
  const { openModal } = useModal();

  const { transactions, updateTransactions, loading, error } = useTransactions();

  return (
    <div>
      <Modal id={newTransaction} title={newTransaction}>
        <UserTransactionCreate updateTransactions={updateTransactions} />
      </Modal>

      <div className='flex justify-between items-center mb-2'>
        <h1 className='align-middle text-xl font-bold'>Transactions</h1>
        <button className={ButtonStyle.Primary} onClick={() => openModal(newTransaction)}>
          New
        </button>
      </div>
      <div>
        <div className={`border-b-2 border-black grid grid-cols-[20%_15%_10%_35%_20%] pb-1 gap-2 font-bold`}>
          <span>date</span>
          <span>amount</span>
          <span>type</span>
          <span>user</span>
          <span>status</span>
        </div>
        {loading && <CircleLoader />}
        {error && <SimpleError message={error} />}
        {transactions.map(x => (
          <UserTransaction key={x.id} transaction={x} updateTransactions={updateTransactions} />
        ))}
        <Paginator page={1} totalPages={1} setPage={() => {}} />
      </div>
    </div>
  );
};

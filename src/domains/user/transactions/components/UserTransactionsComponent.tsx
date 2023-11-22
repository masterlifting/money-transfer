/** @format */

import { SimpleError } from '../../../../shared/components/errors/ErrorSimpleComponent';
import { CircleLoader } from '../../../../shared/components/loaders/CircleLoaderComponents';
import { Modal } from '../../../../shared/components/modals/ModalComponent';
import { useModalState } from '../../../../shared/components/modals/ModalHooks';
import { Paginator } from '../../../../shared/components/paginators/PaginationComponent';
import { ButtonStyle } from '../../../../shared/styles/Button';
import { IAuthUserGet } from '../../../auth/AuthTypes';
import { useUserTransactions } from '../UserTransactionsHooks';
import { UserTransaction } from './UserTransactionComponent';
import { UserTransactionCreate } from './UserTransactionCreateComponent';

interface IUserTransactionsProps {
  user: IAuthUserGet;
}

export const UserTransactions = ({ user }: IUserTransactionsProps) => {
  const newTransaction = 'New money transfer.';
  const { openModal } = useModalState();

  const { userTransactionsTotalCount, userTransactions, setUserTransactions, userTransactionsLoading, useUserTransactionsError } =
    useUserTransactions(user);

  return (
    <div>
      <Modal id={newTransaction} title={newTransaction}>
        <UserTransactionCreate user={user} setUserTransactions={setUserTransactions} />
      </Modal>

      <div className='flex justify-between items-center mb-2'>
        <h1 className='align-middle text-xl font-bold'>Transactions: {userTransactionsTotalCount}</h1>
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
        {userTransactionsLoading && <CircleLoader />}
        {useUserTransactionsError && <SimpleError message={useUserTransactionsError} />}
        {userTransactions.map(x => (
          <UserTransaction user={user} key={x.id} transaction={x} setUserTransactions={setUserTransactions} />
        ))}
        <Paginator itemsTotalCount={userTransactionsTotalCount} setItemsPerPage={setUserTransactions} />
      </div>
    </div>
  );
};

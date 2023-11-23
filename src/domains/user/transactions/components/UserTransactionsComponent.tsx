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

  const {
    userTransactionsTotalCount,
    userTransactions,
    userTransactionsFilter,
    setTransactionsFilter,
    userTransactionsLoading,
    useUserTransactionsError,
  } = useUserTransactions(user);

  console.log(userTransactions);

  return (
    <div>
      <Modal id={newTransaction} title={newTransaction}>
        <UserTransactionCreate user={user} />
      </Modal>

      <div className='flex justify-between items-center mb-2'>
        <h1 className='align-middle text-xl font-bold'>Transactions: {userTransactionsTotalCount}</h1>
        <button className={ButtonStyle.Primary} onClick={() => openModal(newTransaction)}>
          New
        </button>
      </div>
      <div>
        <div className={`border-b-2 border-black grid grid-cols-[20%_15%_10%_35%_20%] pb-1 gap-2 font-bold`}>
          <span
            onClick={() =>
              setTransactionsFilter(prev => ({
                ...prev,
                sortField: 'date',
                sortDirection: prev.sortDirection === 'asc' ? 'desc' : 'asc',
              }))
            }
            className='cursor-pointer'
          >
            date
          </span>
          <span
            onClick={() =>
              setTransactionsFilter(prev => ({
                ...prev,
                sortField: 'amount',
                sortDirection: prev.sortDirection === 'asc' ? 'desc' : 'asc',
              }))
            }
            className='cursor-pointer'
          >
            amount
          </span>
          <span
            onClick={() =>
              setTransactionsFilter(prev => ({
                ...prev,
                sortField: 'type',
                sortDirection: prev.sortDirection === 'asc' ? 'desc' : 'asc',
              }))
            }
            className='cursor-pointer'
          >
            type
          </span>
          <span
            onClick={() =>
              setTransactionsFilter(prev => ({
                ...prev,
                sortField: 'user',
                sortDirection: prev.sortDirection === 'asc' ? 'desc' : 'asc',
              }))
            }
            className='cursor-pointer'
          >
            user
          </span>
          <span
            onClick={() =>
              setTransactionsFilter(prev => ({
                ...prev,
                sortField: 'status',
                sortDirection: prev.sortDirection === 'asc' ? 'desc' : 'asc',
              }))
            }
            className='cursor-pointer'
          >
            status
          </span>
        </div>
        {userTransactionsLoading && <CircleLoader />}
        {useUserTransactionsError && <SimpleError message={useUserTransactionsError} />}
        {userTransactions.map(x => (
          <UserTransaction user={user} key={x.id} transaction={x} />
        ))}
        <Paginator
          itemsTotalCount={userTransactionsTotalCount}
          pageNumber={userTransactionsFilter.pageNumber}
          pageItemsCount={userTransactionsFilter.totalItemsCount}
          setItemsPerPage={setTransactionsFilter}
        />
      </div>
    </div>
  );
};

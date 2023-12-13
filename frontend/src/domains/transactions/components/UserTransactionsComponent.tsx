/** @format */

import { Error } from '../../../shared/components/errors/ErrorComponent';
import { CircleLoader } from '../../../shared/components/loaders/CircleLoaderComponents';
import { Modal } from '../../../shared/components/modals/ModalComponent';
import { useModalContext } from '../../../shared/components/modals/ModalHooks';
import { Paginator } from '../../../shared/components/paginations/PaginationComponent';
import { SortingField } from '../../../shared/components/sortings/SortingFieldComponent';
import { ButtonClass } from '../../../shared/styles/Button';
import { IAuthUserGet } from '../../../../../shared/types/AuthTypes';
import { useUserTransactions } from '../UserTransactionsHooks';
import { UserTransaction } from './UserTransactionComponent';
import { UserTransactionCreate } from './UserTransactionCreateComponent';

interface IUserTransactionsProps {
  user: IAuthUserGet;
}

export const UserTransactions = ({ user }: IUserTransactionsProps) => {
  const newTransactionLabel = 'New money transfer';

  const { openModal } = useModalContext();

  const {
    userTransactions,
    userTransactionsLoading,
    userTransactionsError,
    userTransactionsPagination,
    userTransactionsSorting,
    userTransactionsSetPagination,
    userTransactionsSetSorting,
  } = useUserTransactions(user);

  return (
    <div>
      <Modal id={newTransactionLabel} title={newTransactionLabel}>
        <UserTransactionCreate user={user} />
      </Modal>

      <div className='flex justify-between items-center mb-2'>
        <h1 className='align-middle text-xl font-bold'>
          {userTransactions.totalCount} {userTransactions.totalCount === 1 ? 'Transaction' : 'Transactions'}
        </h1>
        <button title='Make a new money transfer' className={ButtonClass.Primary} onClick={() => openModal(newTransactionLabel)}>
          New
        </button>
      </div>
      <div>
        <div className={`border-b-2 border-black grid grid-cols-[20%_15%_10%_35%_20%] pb-1 gap-2 font-bold`}>
          <SortingField name={'date'} configuration={userTransactionsSorting} setSorting={userTransactionsSetSorting} />
          <SortingField name={'amount'} configuration={userTransactionsSorting} setSorting={userTransactionsSetSorting} />
          <SortingField name={'type'} configuration={userTransactionsSorting} setSorting={userTransactionsSetSorting} />
          <SortingField name={'user'} configuration={userTransactionsSorting} setSorting={userTransactionsSetSorting} />
          <SortingField name={'status'} configuration={userTransactionsSorting} setSorting={userTransactionsSetSorting} />
        </div>
        {userTransactionsLoading && <CircleLoader />}
        {userTransactionsError && <Error error={userTransactionsError} />}
        {userTransactions.items.map(x => (
          <UserTransaction user={user} key={x.id} transaction={x} />
        ))}
        <Paginator
          totalItemsCount={userTransactions.totalCount}
          pageItemsCount={userTransactions.items.length}
          configuration={userTransactionsPagination}
          setPaginator={userTransactionsSetPagination}
        />
      </div>
    </div>
  );
};

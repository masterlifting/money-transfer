/** @format */

import { Error } from '../../../shared/components/errors/ErrorComponent';
import { CircleLoader } from '../../../shared/components/loaders/CircleLoaderComponents';
import { Modal } from '../../../shared/components/modals/ModalComponent';
import { Paginator } from '../../../shared/components/paginations/PaginationComponent';
import { SortingField } from '../../../shared/components/sortings/SortingFieldComponent';
import { ButtonClass } from '../../../shared/styles/button';
import { IAuthUserGet } from '../../../../../shared/types/authTypes';
import { useTransactions } from '../transactionsHooks';
import { UserTransaction } from './UserTransactionComponent';
import { UserTransactionCreate } from './UserTransactionCreateComponent';
import React from 'react';
import { useAppActions } from '../../../shared/hooks/useAppActions';

interface IUserTransactionsProps {
  user: IAuthUserGet;
}

export const UserTransactions = ({ user }: IUserTransactionsProps) => {
  const newTransactionLabel = 'New money transfer';

  const { openModal } = useAppActions();

  const {
    isLoading,
    fetchingError,

    transactions,

    sortingState,
    setSortingState,

    paginationState,
    setPaginstionState,
  } = useTransactions(user);

  return (
    <div>
      <Modal id={newTransactionLabel} title={newTransactionLabel}>
        <UserTransactionCreate user={user} />
      </Modal>

      <div className='flex justify-between items-center mb-2'>
        <h1 className='align-middle text-xl font-bold'>
          {transactions.totalCount} {transactions.totalCount === 1 ? 'Transaction' : 'Transactions'}
        </h1>
        <button title='Make a new money transfer' className={ButtonClass.Primary} onClick={() => openModal(newTransactionLabel)}>
          New
        </button>
      </div>
      <div>
        <div className={`border-b-2 border-black grid grid-cols-[20%_15%_10%_35%_20%] pb-1 gap-2 font-bold`}>
          <SortingField name={'date'} state={sortingState} setState={setSortingState} />
          <SortingField name={'amount'} state={sortingState} setState={setSortingState} />
          <SortingField name={'type'} state={sortingState} setState={setSortingState} />
          <SortingField name={'user'} state={sortingState} setState={setSortingState} />
          <SortingField name={'status'} state={sortingState} setState={setSortingState} />
        </div>
        {isLoading && <CircleLoader />}
        {fetchingError && <Error error={fetchingError} />}
        {transactions.items.map(x => (
          <UserTransaction user={user} key={x.id} transaction={x} />
        ))}
        <Paginator
          totalItemsCount={transactions.totalCount}
          pageItemsCount={transactions.items.length}
          state={paginationState}
          setPaginatonState={setPaginstionState}
        />
      </div>
    </div>
  );
};

/** @format */

import { IAuthUserGet } from '../../../../../shared/types/authTypes';
import { Error } from '../../../shared/components/errors/ErrorComponent';
import { CircleLoader } from '../../../shared/components/loaders/CircleLoaderComponents';
import { Modal } from '../../../shared/components/modals/ModalComponent';
import { Paginator } from '../../../shared/components/paginations/PaginationComponent';
import { SortingField } from '../../../shared/components/sortings/SortingFieldComponent';
import { ButtonClass } from '../../../shared/styles/button';
import { useTransactions } from '../transactionsHooks';
import { UserTransaction } from './UserTransactionComponent';
import { UserTransactionCreate } from './UserTransactionCreateComponent';
import React from 'react';

interface ITransactionProps {
  user: IAuthUserGet;
}

export const UserTransactions = ({ user }: ITransactionProps) => {
  const modalTitle = 'New money transfer';

  const {
    openModal,

    isLoading,
    validationResult,

    totalCount,
    transactions,

    sortingState,
    setSortingState,

    paginationState,
    setPaginstionState,
  } = useTransactions(user);

  return (
    <div>
      <Modal id={modalTitle} title={modalTitle}>
        <UserTransactionCreate user={user} />
      </Modal>

      <div className='flex justify-between items-center mb-2'>
        <h1 className='align-middle text-xl font-bold'>
          {totalCount} {totalCount === 1 ? 'Transaction' : 'Transactions'}
        </h1>
        <button title='Make a new money transfer' className={ButtonClass.Primary} onClick={() => openModal(modalTitle)}>
          New
        </button>
      </div>
      <div>
        <div className={`border-b-2 border-black grid grid-cols-[20%_15%_10%_35%_20%] pb-1 gap-2 font-bold`}>
          {['date', 'amount', 'type', 'user', 'status'].map(columnName => (
            <SortingField key={columnName} name={columnName} state={sortingState} setState={setSortingState} />
          ))}
        </div>

        {isLoading ? (
          <CircleLoader />
        ) : !validationResult.isValid ? (
          <Error error={validationResult} />
        ) : (
          transactions.map(x => <UserTransaction user={user} key={x.id} transaction={x} />)
        )}
        <Paginator
          totalItemsCount={totalCount}
          pageItemsCount={transactions.length}
          state={paginationState}
          setPaginatonState={setPaginstionState}
        />
      </div>
    </div>
  );
};

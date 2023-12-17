/** @format */

import { Error } from '../../../../shared/components/errors/ErrorComponent';
import { CircleLoader } from '../../../../shared/components/loaders/CircleLoaderComponents';
import { Modal } from '../../../../shared/components/modals/ModalComponent';
import { Paginator } from '../../../../shared/components/paginations/PaginationComponent';
import { SortingField } from '../../../../shared/components/sortings/SortingFieldComponent';
import { ButtonClass } from '../../../../shared/styles/button';
import { IUser } from '../../../interfaces';
import React from 'react';
import { CreateUserTransaction } from './CreateUserTransactionComponent';
import { useGetUserTransactions } from '../userUserTransactionsHooks';
import { ShowUserTransaction } from './ShowUserTransactionComponent';

interface ITransactionProps {
  user: IUser;
}

export const ShowUserTransactions = ({ user }: ITransactionProps) => {
  const modalTitle = 'New money transfer';

  const {
    openModal,

    isLoading,
    validationResult,

    transactions,
    transactionsTotalCount,

    sortingState,
    setSortingState,

    paginationState,
    setPaginstionState,
  } = useGetUserTransactions(user);

  return (
    <div>
      <Modal id={modalTitle} title={modalTitle}>
        <CreateUserTransaction user={user} />
      </Modal>

      <div className='flex justify-between items-center mb-2'>
        <h1 className='align-middle text-xl font-bold'>
          {transactionsTotalCount} {transactionsTotalCount === 1 ? 'Transaction' : 'Transactions'}
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
          transactions.map(x => <ShowUserTransaction user={user} key={x.id} transaction={x} />)
        )}
        <Paginator
          totalItemsCount={transactionsTotalCount}
          pageItemsCount={transactions.length}
          state={paginationState}
          setPaginatonState={setPaginstionState}
        />
      </div>
    </div>
  );
};

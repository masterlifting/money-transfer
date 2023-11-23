/** @format */

import { SimpleError } from '../../../../shared/components/errors/ErrorSimpleComponent';
import { CircleLoader } from '../../../../shared/components/loaders/CircleLoaderComponents';
import { Modal } from '../../../../shared/components/modals/ModalComponent';
import { useModalContext } from '../../../../shared/components/modals/ModalHooks';
import { Paginator } from '../../../../shared/components/paginators/PaginationComponent';
import { ButtonStyle } from '../../../../shared/styles/Button';
import { IAuthUserGet } from '../../../auth/AuthTypes';
import { useUserTransactions } from '../UserTransactionsHooks';
import { UserTransaction } from './UserTransactionComponent';
import { UserTransactionCreate } from './UserTransactionCreateComponent';

interface IUserTransactionsProps {
  user: IAuthUserGet;
}
const sortingDateield = 'date';
const sortingAmountField = 'amount';
const sortingTypeField = 'type';
const sortingUserField = 'user';
const sortingStatusField = 'status';

export const UserTransactions = ({ user }: IUserTransactionsProps) => {
  const newTransaction = 'New money transfer.';
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
      <Modal id={newTransaction} title={newTransaction}>
        <UserTransactionCreate user={user} />
      </Modal>

      <div className='flex justify-between items-center mb-2'>
        <h1 className='align-middle text-xl font-bold'>Transactions: {userTransactions.totalCount}</h1>
        <button className={ButtonStyle.Primary} onClick={() => openModal(newTransaction)}>
          New
        </button>
      </div>
      <div>
        <div className={`border-b-2 border-black grid grid-cols-[20%_15%_10%_35%_20%] pb-1 gap-2 font-bold`}>
          <span
            onClick={() =>
              userTransactionsSetSorting(prev => ({
                ...prev,
                fieldName: sortingDateield,
                direction: prev.direction === 'asc' ? 'desc' : 'asc',
              }))
            }
            className={`cursor-pointer ${userTransactionsSorting.fieldName === sortingDateield && 'text-blue-600'}`}
          >
            {sortingDateield}
          </span>
          <span
            onClick={() =>
              userTransactionsSetSorting(prev => ({
                ...prev,
                fieldName: sortingAmountField,
                direction: prev.direction === 'asc' ? 'desc' : 'asc',
              }))
            }
            className={`cursor-pointer ${userTransactionsSorting.fieldName === sortingAmountField && 'text-blue-600'}`}
          >
            {sortingAmountField}
          </span>
          <span
            onClick={() =>
              userTransactionsSetSorting(prev => ({
                ...prev,
                fieldName: sortingTypeField,
                direction: prev.direction === 'asc' ? 'desc' : 'asc',
              }))
            }
            className={`cursor-pointer ${userTransactionsSorting.fieldName === sortingTypeField && 'text-blue-600'}`}
          >
            {sortingTypeField}
          </span>
          <span
            onClick={() =>
              userTransactionsSetSorting(prev => ({
                ...prev,
                fieldName: sortingUserField,
                direction: prev.direction === 'asc' ? 'desc' : 'asc',
              }))
            }
            className={`cursor-pointer ${userTransactionsSorting.fieldName === sortingUserField && 'text-blue-600'}`}
          >
            {sortingUserField}
          </span>
          <span
            onClick={() =>
              userTransactionsSetSorting(prev => ({
                ...prev,
                fieldName: sortingStatusField,
                direction: prev.direction === 'asc' ? 'desc' : 'asc',
              }))
            }
            className={`cursor-pointer ${userTransactionsSorting.fieldName === sortingStatusField && 'text-blue-600'}`}
          >
            {sortingStatusField}
          </span>
        </div>
        {userTransactionsLoading && <CircleLoader />}
        {userTransactionsError && <SimpleError message={userTransactionsError} />}
        {userTransactions.items.map(x => (
          <UserTransaction user={user} key={x.id} transaction={x} />
        ))}
        <Paginator
          totalItemsCount={userTransactions.totalCount}
          configuration={userTransactionsPagination}
          setPaginator={userTransactionsSetPagination}
        />
      </div>
    </div>
  );
};

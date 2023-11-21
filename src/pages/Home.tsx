/** @format */

import { useAuthRedirection } from '../domains/auth/AuthHooks';
import { UserTransactions } from '../domains/user/transactions/components/UserTransactionsComponent';

export const Home = () => {
  const isAuthorized = useAuthRedirection();
  return isAuthorized ? <UserTransactions /> : null;
};

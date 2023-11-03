/** @format */

import { useAuthState } from '../domains/auth/AuthHooks';
import { TransactionList } from '../domains/transactions/components/TransactionList';

export const Home = () => {
  const { isAuthorized: isAuthorised } = useAuthState();
  return isAuthorised ? <TransactionList /> : <div>Not authorised</div>;
};

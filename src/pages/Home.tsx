/** @format */

import { useWithAuth } from '../domains/auth/AuthHooks';
import { TransactionList } from '../domains/transactions/components/TransactionList';

export const Home = () => {
  const isAuthorized = useWithAuth();
  return isAuthorized ? <TransactionList /> : null;
};

/** @format */

import React from 'react';
import { useAuthorize } from '../domains/auth/AuthHooks';
import { UserTransactions } from '../domains/transactions/components/UserTransactionsComponent';

export const Home = () => {
  const { authUser } = useAuthorize();
  return authUser && <UserTransactions user={authUser} />;
};

/** @format */

import React from 'react';
import { useAuthorize } from '../domains/auth/authHooks';
import { UserTransactions } from '../domains/transactions/components/UserTransactionsComponent';

export const Home = () => {
  const { authUser } = useAuthorize();
  return <UserTransactions user={authUser} />;
};

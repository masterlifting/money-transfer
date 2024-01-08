/** @format */

import React from 'react';
import { useAuthorize } from '../features/auth/authHooks';
import { ShowUserTransactions } from '../features/user/transactions/components/ShowUserTransactionsComponent';

export const Home = () => {
  const { user } = useAuthorize();
  return user && <ShowUserTransactions user={user} />;
};

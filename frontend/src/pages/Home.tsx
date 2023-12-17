/** @format */

import React from 'react';
import { useAuthorize } from '../domains/auth/authHooks';
import { ShowUserTransactions } from '../domains/user/transactions/components/ShowUserTransactionsComponent';

export const Home = () => {
  const { user } = useAuthorize();
  return user && <ShowUserTransactions user={user} />;
};

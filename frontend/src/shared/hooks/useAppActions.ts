/** @format */

import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../domains/auth/authSlice';
import { usersActions } from '../../domains/users/usersSlice';
import { transactionsActions } from '../../domains/transactions/transactionsSlice';

const actions = {
  ...authActions,
  ...usersActions,
  ...transactionsActions,
};

export const useAppActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
};

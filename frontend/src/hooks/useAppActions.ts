/** @format */

import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { modalActions } from '../components/modals/modalSlice';
import { authActions } from '../features/auth/authSlice';
import { userBalanceActions } from '../features/user/balance/userBalanceSlice';
import { userTransactionsActions } from '../features/user/transactions/userTransactionsSlice';

const actions = {
  ...modalActions,
  ...authActions,
  ...userBalanceActions,
  ...userTransactionsActions,
};

export const useAppActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
};

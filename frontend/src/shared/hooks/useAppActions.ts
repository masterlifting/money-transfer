/** @format */

import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../domains/auth/authSlice';
import { userActions } from '../../domains/user/userSlice';
import { modalActions } from '../components/modals/modalSlice';

const actions = {
  ...modalActions,
  ...authActions,
  ...userActions,
};

export const useAppActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
};

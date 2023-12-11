/** @format */

import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../domains/auth/AuthSlice';

const actions = {
  ...authActions,
};

export const useAppActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
};

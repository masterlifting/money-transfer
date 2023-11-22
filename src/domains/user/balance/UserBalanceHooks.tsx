/** @format */

import { useContext } from 'react';
import { UserBalanceContext } from './UserBalanceContext';

export const useUserBalanceState = () => {
  return useContext(UserBalanceContext);
};

/** @format */

import { useContext } from 'react';
import { UserBalanceContext } from './UserBalanceContext';

export const useUserBalance = () => {
  return useContext(UserBalanceContext);
};

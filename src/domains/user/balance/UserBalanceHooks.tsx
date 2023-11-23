/** @format */

import { useContext } from 'react';
import { UserBalanceContext } from './UserBalanceContext';

export const useUserBalanceContext = () => {
  return useContext(UserBalanceContext);
};

/** @format */

import { useContext } from 'react';
import { UserBalanceContext } from './UserBalanceContext';

export const useUserBalanceContext = () => useContext(UserBalanceContext);

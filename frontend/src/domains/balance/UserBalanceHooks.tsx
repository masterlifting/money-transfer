/** @format */

import { useContext } from 'react';
import { UserBalanceContext } from './userBalanceContext';

export const useUserBalanceContext = () => useContext(UserBalanceContext);

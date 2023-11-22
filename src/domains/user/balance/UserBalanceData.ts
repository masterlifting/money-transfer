/** @format */

import { IAuthUserGet } from '../../auth/AuthTypes';
import { IUserBalanceGet } from './UserBalanceTypes';

export const fetchUserBalance = async (user: IAuthUserGet): Promise<IUserBalanceGet> => {
  return {
    balance: 1000,
    currency: 'EUR',
    symbol: '€',
  };
};

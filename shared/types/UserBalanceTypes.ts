/** @format */

import { IMoney } from '../../shared/types/MoneyTypes';
import { IUserGet } from '../../shared/types/UserTypes';
import { IAuthUserGet } from './AuthTypes';

export interface IUserBalanceGet {
  user: IUserGet;
  amount: IMoney;
}

export interface IUserBalanceContext {
  userBalance?: IUserBalanceGet;
  updateUserBalance: (user: IAuthUserGet) => void;
}

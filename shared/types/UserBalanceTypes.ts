/** @format */

import { IMoney } from './moneyTypes';
import { IUserGet } from './userTypes';
import { IAuthUserGet } from './authTypes';

export interface IUserBalanceGet {
  user: IUserGet;
  amount: IMoney;
}

export interface IUserBalanceContext {
  userBalance?: IUserBalanceGet;
  updateUserBalance: (user: IAuthUserGet) => void;
}

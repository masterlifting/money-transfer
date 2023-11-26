/** @format */

import { IMoney } from '../types/MoneyTypes';
import { IUserGet } from '../types/UserTypes';

export interface IUserBalanceGet {
  user: IUserGet;
  amount: IMoney;
}

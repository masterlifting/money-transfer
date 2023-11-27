/** @format */

import { IMoney } from '../../../shared/types/MoneyTypes';
import { IUserGet } from '../../../shared/types/UserTypes';

export interface IUserBalanceGet {
  user: IUserGet;
  amount: IMoney;
}

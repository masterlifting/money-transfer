/** @format */
import { IUserBalance as ISharedUserBalance } from '../../../../../shared/interfaces';
import { IUser } from '../../auth/authTypes';

export interface IUserBalance extends ISharedUserBalance {}

export interface IUserBalanceGetRequest {
  user: IUser;
}

export interface IUserBalanceState {
  userBalance: IUserBalance;
}

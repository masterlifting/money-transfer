/** @format */

import {
  IAmount,
  IUser as ISharedUser,
  IUserBalance as ISharedUserBalance,
  IUserTransaction as ISharedUserTransaction,
} from '../interfaces';
import { UserTransactionType } from '../types';

export interface IUser extends ISharedUser {}
export interface IUserCreate {
  email: string;
}
export interface IUserBalance extends ISharedUserBalance {}
export interface IUserTransaction extends ISharedUserTransaction {}
export interface IUserTransactionCreate {
  user: IUser;
  type: UserTransactionType;
  amount: IAmount;
  description?: string;
}
export interface IUserTransactions {
  totalCount: number;
  items: IUserTransaction[];
}

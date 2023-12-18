/** @format */

import {
  IDataFilter,
  IUser as ISharedUser,
  IUserBalance as ISharedUserBalance,
  IUserTransaction as ISharedUserTransaction,
} from '../../../shared/interfaces';
import { IUserTransactionRequest } from '../../../shared/interfacesDto';

export interface IUser extends ISharedUser {
  token: string;
}
export interface IUserBalance extends ISharedUserBalance {}
export interface IUserTransaction extends ISharedUserTransaction {}

export interface IUsersGetRequest {
  token: string;
  filter?: IDataFilter;
}
export interface IUserBalanceGetRequest {
  user: IUser;
}
export interface IUserTransactionsGetRequest {
  user: IUser;
  filter?: IDataFilter;
}
export interface IUserTransactionPostRequest {
  user: IUser;
  transaction: IUserTransactionRequest;
}

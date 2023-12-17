/** @format */

import {
  IDataFilter,
  IUser as ISharedUser,
  IUserBalance as ISharedUserBalance,
  IUserTransaction as ISharedUserTransaction,
} from '../../../shared/interfaces';
import { IUserTransactionRequest } from '../../../shared/interfacesDto';

export interface IUser extends ISharedUser {}
export interface IUserBalance extends ISharedUserBalance {}
export interface IUserTransaction extends ISharedUserTransaction {}
export interface IUserTransactionsGetRequest {
  userId: string;
  filter?: IDataFilter;
}
export interface IUserTransactionPostRequest {
  userId: string;
  transaction: IUserTransactionRequest;
}

/** @format */

import { IDataFilter, IUser as ISharedUser, IUserTransaction as ISharedUserTransaction } from '../../../../../shared/interfaces';
import { IUserTransactionRequest } from '../../../../../shared/interfacesDto';
import { IUser } from '../../auth/authTypes';

export interface IUserTransaction extends ISharedUserTransaction {}

export interface IUserTransactionRecipientsGetRequest {
  token: string;
  filter?: IDataFilter;
}

export interface IUserTransactionsGetRequest {
  user: IUser;
  filter?: IDataFilter;
}
export interface IUserTransactionPostRequest {
  user: IUser;
  transaction: IUserTransactionRequest;
}

export interface IUserTransactionsState {
  userEmail?: string;
  userTransactionRecipients: ISharedUser[];
  userTransactions: IUserTransaction[];
  userTransactionsTotalCount: number;
}

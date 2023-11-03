/** @format */

import { IUser } from '../auth/AuthInterfaces';

interface ITransaction {
  from: IUser;
  to: IUser;
  amount: number;
}

export interface ITransactionGet extends ITransaction {
  id: number;
  status: 'pending' | 'completed' | 'failed';
  from: IUser;
  to: IUser;
  amount: number;
  date: string;
}

export interface ITransactionPost extends ITransaction {
  from: IUser;
  to: IUser;
  amount: number;
}

export interface ITransactionPostResponse {
  status: 'success' | 'error';
  error: string | null;
  data?: ITransactionGet;
}

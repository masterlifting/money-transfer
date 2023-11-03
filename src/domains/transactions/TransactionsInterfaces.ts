/** @format */

import { IUserGet } from '../auth/AuthInterfaces';

interface ITransaction {
  from: IUserGet;
  to: IUserGet;
  amount: number;
}

export interface ITransactionGet extends ITransaction {
  id: number;
  status: 'pending' | 'completed' | 'failed';
  date: string;
}

export interface ITransactionPost extends ITransaction {}

/** @format */

import { IUserGet } from '../auth/AuthTypes';

type TransactionType = 'income' | 'outcome';
type TransactionStatus = 'created' | 'pending' | 'completed' | 'failed';

interface ITransaction {
  user: IUserGet;
  amount: number;
}

export interface ITransactionGet extends ITransaction {
  id: string;
  date: Date;
  type: TransactionType;
  status: TransactionStatus;
}

export interface ITransactionStatusGet {
  id: string;
  status: TransactionStatus;
}

export interface ITransactionPost extends ITransaction {}

/** @format */

import { IUserGet } from '../auth/AuthModels';

interface ITransaction {
  user: IUserGet;
  amount: number;
}

export interface ITransactionGet extends ITransaction {
  id: string;
  date: Date;
  type: 'income' | 'outcome';
  status: 'created' | 'pending' | 'completed' | 'failed';
}

export interface ITransactionPost extends ITransaction {
  recepientId: string;
}

/** @format */

import { UUID } from 'crypto';
import { IUser, IUserGet } from '../auth/AuthInterfaces';

interface ITransaction {
  to: IUser;
  amount: number;
}

export interface ITransactionGet extends ITransaction {
  id: UUID;
  status: 'pending' | 'completed' | 'failed';
  date: Date;
}

export interface ITransactionPost extends ITransaction {
  from: IUserGet;
}

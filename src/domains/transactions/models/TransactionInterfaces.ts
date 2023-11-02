/** @format */

import { IUser } from '../../auth/models/IAuthInterfaces';
import { TransactionStatus } from './TransactionTypes';

export interface ITransaction {
  id: number;
  staus: TransactionStatus;
  from: IUser;
  to: IUser;
  amount: number;
  date: string;
}

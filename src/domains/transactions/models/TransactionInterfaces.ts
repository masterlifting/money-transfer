/** @format */

import { IUser } from '../../auth/models/IAuthInterfaces';

export interface ITransaction {
  id: number;
  status: 'pending' | 'completed' | 'failed';
  from: IUser;
  to: IUser;
  amount: number;
  date: string;
}

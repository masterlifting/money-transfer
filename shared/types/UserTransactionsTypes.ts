/** @format */

import { IPagination } from './paginationTypes';
import { ISorting } from './sortingFieldTypes';
import { IMoney } from './moneyTypes';
import { IUserGet } from './userTypes';

type TransactionType = 'Income' | 'Outcome';
type TransactionStatus = 'Created' | 'Pending' | 'Completed' | 'Failed';

interface IUserTransaction {
  user: IUserGet;
  amount: IMoney;
}

export interface IUserTransactionGet extends IUserTransaction {
  id: string;
  date: Date;
  type: TransactionType;
  status: TransactionStatus;
  description?: string;
}

export interface IUserTransactionsFilter {
  userId: string;
  pagination?: IPagination;
  sorting?: ISorting;
}

export interface IUserTransactionsGet {
  totalCount: number;
  items: IUserTransactionGet[];
}

export interface IUserTransactionPost extends IUserTransaction {
  senderId: string;
}

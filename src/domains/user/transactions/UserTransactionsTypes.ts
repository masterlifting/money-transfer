/** @format */

import { IPagination } from '../../../shared/components/paginators/PaginationTypes';
import { IUserGet } from '../types/UserTypes';

type TransactionType = 'income' | 'outcome';
type TransactionStatus = 'created' | 'pending' | 'completed' | 'failed';

interface IUserTransaction {
  user: IUserGet;
  amount: number;
}

export interface IUserTransactionGet extends IUserTransaction {
  id: string;
  date: Date;
  type: TransactionType;
  status: TransactionStatus;
}

export interface IUserTransactionsGet {
  totalCount: number;
  items: IUserTransactionGet[];
}

export interface IUserTransactionStatusGet {
  id: string;
  status: TransactionStatus;
}

export interface IUserTransactionPost extends IUserTransaction {}

export interface ISortedData {
  fieldName: string;
  direction: 'asc' | 'desc';
}

export interface IUserTransactionsFilter {
  pagination?: IPagination;
  sorting?: ISortedData;
}

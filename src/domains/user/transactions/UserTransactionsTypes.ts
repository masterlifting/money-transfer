/** @format */

import { IPagination } from '../../../shared/components/paginators/PaginationTypes';
import { ISorting } from '../../../shared/components/sortings/SortingFieldTypes';
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

export interface IUserTransactionsFilter {
  pagination?: IPagination;
  sorting?: ISorting;
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

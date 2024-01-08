/** @format */

import {
  CurrencySymbolType,
  CurrencyType,
  PaginationPageItemsCountType,
  SortingDirectionType,
  UserTransactionStatusType,
  UserTransactionType,
} from './types';

export interface IError {
  message: string;
}

export interface IValidationSuccess {
  isValid: true;
}

export interface IValidationFailure {
  isValid: false;
  errors: IError[];
}

export interface IPagination {
  pageNumber: number;
  pageItemsCount: PaginationPageItemsCountType;
}

export interface ISorting {
  fieldName: string;
  direction: SortingDirectionType;
}

export interface IDataFilter {
  include?: {
    [key: string]: any;
  };
  pageNumber?: number;
  pageItemsCount?: PaginationPageItemsCountType;
  sortingFieldName?: string;
  sortingDirection?: SortingDirectionType;
}

export interface IAmount {
  value: number;
  currency: CurrencyType;
  symbol: CurrencySymbolType;
}

export interface IUser {
  id: string;
  email: string;
}

export interface IUserBalance {
  amount: IAmount;
}

export interface IUserTransaction {
  id: string;
  date: Date;
  user: IUser;
  amount: IAmount;
  status: UserTransactionStatusType;
  type: UserTransactionType;
  description?: string;
}

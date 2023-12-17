/** @format */

import { IAmount, IDataFilter, IError, IUser, IUserBalance, IUserTransaction } from './interfaces';

interface IWebApiError extends IError {
  code?: number;
}

export interface IWebApiSuccessResponse<T> {
  isSuccess: true;
  data: T;
}

export interface IWebApiErrorResponse {
  isSuccess: false;
  error: IWebApiError;
}

export interface IAuthRequest {
  email: string;
  password: string;
  confirmPassword?: string;
}
export interface IAuthResponse {
  user: IUser;
  token: string;
}

export interface IUsersResponse {
  users: IUser[];
}

export interface IUserBalanceResponse {
  balance: IUserBalance;
}

export interface IUserTransactionResponse {
  transaction: IUserTransaction;
}

export interface IUserTransactionRequest {
  user: IUser;
  amount: IAmount;
  description?: string;
}

export interface IUserTransactionsResponse {
  totalCount: number;
  items: IUserTransaction[];
}

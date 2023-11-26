/** @format */

import { WebApiResponse } from '../../../shared/types/WebApiTypes';
import {
  IUserTransactionGet,
  IUserTransactionPost,
  IUserTransactionsFilter,
  IUserTransactionsGet,
} from './UserTransactionsTypes';
import { IUserGet } from '../types/UserTypes';
import { backendGetUserTransactions, backendGetUsers, backendPostUserTransaction } from '../../../backendMockData';
import { IAuthUserGet } from '../../auth/AuthTypes';

export const fetchUserTransactions = async (
  user: IAuthUserGet,
  filter: IUserTransactionsFilter,
): Promise<WebApiResponse<IUserTransactionsGet>> => {
  try {
    return {
      isSuccess: true,
      data: await backendGetUserTransactions(user, filter),
    };
  } catch (e: any) {
    return {
      isSuccess: false,
      error: {
        message: e.message,
      },
    };
  }
};

export const commitUserTransaction = async (
  user: IAuthUserGet,
  transaction: IUserTransactionPost,
): Promise<WebApiResponse<IUserTransactionGet>> => {
  try {
    return {
      isSuccess: true,
      data: await backendPostUserTransaction(user, transaction),
    };
  } catch (e: any) {
    return {
      isSuccess: false,
      error: {
        message: e.message,
      },
    };
  }
};

export const fetchUserTransactionRecipients = async (user: IAuthUserGet): Promise<WebApiResponse<IUserGet[]>> => {
  try {
    var users = await backendGetUsers();

    return {
      isSuccess: true,
      data: users.filter(x => x.id !== user.id),
    };
  } catch (e: any) {
    return {
      isSuccess: false,
      error: {
        message: e.message,
      },
    };
  }
};

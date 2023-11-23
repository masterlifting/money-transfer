/** @format */

import { WebApiResponse } from '../../../shared/types/WebApiTypes';
import {
  IUserTransactionGet,
  IUserTransactionPost,
  IUserTransactionStatusGet,
  IUserTransactionsFilter,
  IUserTransactionsGet,
} from './UserTransactionsTypes';
import { IUserGet } from '../types/UserTypes';
import {
  backendGetFilteredUserTransactions,
  backendGetTransactions,
  backendGetUsers,
  backendPostTransaction,
  backendGetTransactionsStatuses,
} from '../../../backendMockData';
import { IAuthUserGet } from '../../auth/AuthTypes';

export const fetchUserTransactions = async (authUser: IAuthUserGet): Promise<WebApiResponse<IUserTransactionsGet>> => {
  try {
    return {
      isSuccess: true,
      data: await backendGetTransactions(authUser),
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

export const fetchFilteredUserTransactions = async (
  filter: IUserTransactionsFilter,
  authUser: IAuthUserGet,
): Promise<WebApiResponse<IUserTransactionsGet>> => {
  try {
    return {
      isSuccess: true,
      data: await backendGetFilteredUserTransactions(authUser, filter),
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
      data: await backendPostTransaction(user, transaction),
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

export const fetchUserTransactionsStatuses = async (
  transactions: IUserTransactionGet[],
): Promise<WebApiResponse<IUserTransactionStatusGet[]>> => {
  try {
    return {
      isSuccess: true,
      data: await backendGetTransactionsStatuses(transactions),
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

export const fetchUserTransactionRecipients = async (authUser: IAuthUserGet): Promise<WebApiResponse<IUserGet[]>> => {
  try {
    var users = await backendGetUsers();

    return {
      isSuccess: true,
      data: users.filter(x => x.id !== authUser.id),
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

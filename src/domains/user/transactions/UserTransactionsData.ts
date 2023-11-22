/** @format */

import { WebApiResponse } from '../../../shared/types/WebApiTypes';
import { IUserTransactionGet, IUserTransactionPost, IUserTransactionStatusGet } from './UserTransactionsTypes';
import { IUserGet } from '../types/UserTypes';
import {
  backendGetTransactions,
  backendGetUsers,
  backendPostTransaction,
  beckendGetTransactionsStatuses,
} from '../../../beckandMockData';
import { IAuthUserGet } from '../../auth/AuthTypes';

export const fetchUserTransactions = async (): Promise<WebApiResponse<IUserTransactionGet[]>> => {
  try {
    return {
      isSuccess: true,
      data: await backendGetTransactions(),
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

export const commitUserTransaction = async (transaction: IUserTransactionPost): Promise<WebApiResponse<IUserTransactionGet>> => {
  try {
    return {
      isSuccess: true,
      data: await backendPostTransaction(transaction),
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
      data: await beckendGetTransactionsStatuses(transactions),
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

export const fetchUserTransactionRecipients = async (authUser?: IAuthUserGet): Promise<WebApiResponse<IUserGet[]>> => {
  try {
    if (!authUser) {
      throw new Error('User is not authorized');
    }

    return {
      isSuccess: true,
      data: (await backendGetUsers()).filter(x => x.id !== authUser.id),
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

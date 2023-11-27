/** @format */

import { backendGetUserBalance } from '../../../backendMockData';
import { WebApiResponseType } from '../../../shared/types/WebApiTypes';
import { IAuthUserGet } from '../../auth/AuthTypes';
import { IUserBalanceGet } from './UserBalanceTypes';

export const fetchUserBalance = async (user: IAuthUserGet): Promise<WebApiResponseType<IUserBalanceGet>> => {
  try {
    return {
      isSuccess: true,
      data: await backendGetUserBalance(user),
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

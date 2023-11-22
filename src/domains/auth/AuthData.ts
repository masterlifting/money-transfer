/** @format */

import { backendAuthorizeUser, backendRegisterUser } from '../../beckandMockData';
import { WebApiResponse } from '../../shared/types/WebApiTypes';
import { IAuthUserGet, IAuthUserPost } from './AuthTypes';

export const authorizeUser = async (user: IAuthUserPost): Promise<WebApiResponse<IAuthUserGet>> => {
  try {
    return {
      isSuccess: true,
      data: await backendAuthorizeUser(user),
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

export const registerUser = async (user: IAuthUserPost): Promise<WebApiResponse<IAuthUserGet>> => {
  try {
    return {
      isSuccess: true,
      data: await backendRegisterUser(user),
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

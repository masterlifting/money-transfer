/** @format */

import { backendAuthorizeUser as backendLoginUser, backendRegisterUser } from '../../_backendMockApi';
import { WebApiResponseType } from '../../shared/types/WebApiTypes';
import { IAuthUserGet, IAuthUserPost } from './AuthTypes';

export const loginUser = async (user: IAuthUserPost): Promise<WebApiResponseType<IAuthUserGet>> => {
  try {
    return {
      isSuccess: true,
      data: await backendLoginUser(user),
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

export const registerUser = async (user: IAuthUserPost): Promise<WebApiResponseType<IAuthUserGet>> => {
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

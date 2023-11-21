/** @format */

import { WebApiResponse } from '../../shared/types/WebApiTypes';
import { IAuthUserGet, IAuthUserPost } from './AuthTypes';

export const authorizeUser = async (user: IAuthUserPost): Promise<WebApiResponse<IAuthUserGet>> => {
  return {
    isSuccess: true,
    data: {
      id: '1',
      email: user.email,
      token: '1234567890',
      refreshToken: '0987654321',
    },
  };
};

/** @format */

import { randomUUID } from 'crypto';
import { WebApiResponse } from '../WebApiModels';
import { IAuthUserGet, IAuthUserPost } from './AuthModels';

export const authorizeUser = async (user: IAuthUserPost): Promise<WebApiResponse<IAuthUserGet>> => {
  return {
    isSuccess: true,
    data: {
      id: randomUUID(),
      email: user.email,
      token: randomUUID(),
      refreshToken: randomUUID(),
    },
  };
};

/** @format */

import { IWebApiPostResponse } from '../WebApiInterfaces';
import { IUserGet, IUserPost } from './AuthInterfaces';

export const loginUser = async (user: IUserPost): Promise<IWebApiPostResponse<IUserGet>> => {
  return {
    isSuccess: true,
    data: {
      id: 1,
      name: 'Test user',
    },
  };
};

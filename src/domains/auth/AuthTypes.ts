/** @format */

import { IUser, IUserGet } from '../user/types/UserTypes';

export interface IAuthUserGet extends IUserGet {
  token: string;
  refreshToken: string;
}

export interface IAuthUserPost extends IUser {
  password: string;
}

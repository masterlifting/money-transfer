/** @format */

import { IUser, IUserGet } from './userTypes';

export type AuthType = 'Login' | 'Register';

export interface IAuthUserGet extends IUserGet {
  token: string;
  refreshToken: string;
}

export interface IAuthUserPost extends IUser {
  password: string;
}

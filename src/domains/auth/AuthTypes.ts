/** @format */

import { IUser, IUserGet } from '../../shared/types/UserTypes';

export type AuthType = 'Login' | 'Register';

export interface IAuthUserGet extends IUserGet {
  token: string;
  refreshToken: string;
}

export interface IAuthUserPost extends IUser {
  password: string;
}

export interface IAuthState {
  authUser?: IAuthUserGet;
}

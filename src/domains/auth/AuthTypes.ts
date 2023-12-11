/** @format */

import { IError } from '../../shared/components/errors/ErrorTypes';
import { IUser, IUserGet } from '../../shared/types/UserTypes';

export type AuthType = 'Login' | 'Register' | 'Logout';

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

export interface IAuthContext {
  authLoading: boolean;
  authUser?: IAuthUserGet;
  authErrors: IError[];
  setAuthState: (authType: AuthType, user: IAuthUserPost) => void;
  clearAuthState: () => void;
}

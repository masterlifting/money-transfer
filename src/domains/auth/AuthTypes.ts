/** @format */

export interface IUser {
  email: string;
}

export interface IUserGet extends IUser {
  id: string;
}

export interface IAuthUserGet extends IUserGet {
  token: string;
  refreshToken: string;
}

export interface IAuthUserPost extends IUser {
  password: string;
}

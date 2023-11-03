/** @format */

export interface IUser {
  id: number;
  email: string;
}

export interface IUserGet extends IUser {
  token: string;
  refreshToken: string;
}

export interface IUserPost extends IUser {
  password: string;
}

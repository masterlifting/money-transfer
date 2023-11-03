/** @format */

export interface IUser {
  name: string;
}

export interface IUserGet extends IUser {
  id: number;
}

export interface IUserPost {
  email: string;
  password: string;
}

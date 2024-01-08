/** @format */
import { IUser as ISharedUser } from '../../../../shared/interfaces';

export interface IUser extends ISharedUser {
  token: string;
}

export interface IAuthState {
  user?: IUser;
}

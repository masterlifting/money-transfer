/** @format */

import { IUserGet } from './../../../shared/types/UserTypes';

import { Request, Response } from 'express';

const _users: IUserGet[] = [];

export const getUsers = (req: Request, res: Response) => {
  _users.push({
    id: '1',
    email: 'test',
  });
  res.send(_users);
};

export const getUserBalance = (req: Request, res: Response) => {
  res.send('Hello from the getUserBalance controller!');
};

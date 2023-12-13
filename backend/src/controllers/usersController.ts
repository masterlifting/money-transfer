/** @format */

import { Request, Response } from 'express';
import { repository } from '../persistence/DbRepository';

export const getUsers = (req: Request, res: Response) => {
  res.send(repository.users.getAll());
};

export const getUserBalance = (req: Request, res: Response) => {
  res.send(repository.users.getBalance(req.params.userId));
};

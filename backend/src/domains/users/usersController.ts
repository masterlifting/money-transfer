/** @format */

import { Request, Response } from 'express';
import { usersService } from './usersService';

export const get = (req: Request, res: Response) => {
  const response = usersService.get();
  res.send(response);
};

export const getBalance = (req: Request, res: Response) => {
  const userId = req.params.id;
  const response = usersService.getBalance(userId);
  res.send(response);
};

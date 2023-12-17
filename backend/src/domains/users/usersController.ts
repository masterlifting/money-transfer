/** @format */

import { Request, Response } from 'express';
import { usersService } from './usersService';
import { IDataFilter } from '../../interfaces';
import { IUserTransactionRequest } from '../../interfacesDto';

export const get = (req: Request, res: Response) => {
  const filter = req.query as IDataFilter;
  const response = usersService.get(filter);
  res.send(response);
};
export const getBalance = (req: Request, res: Response) => {
  const userId = req.params.id;
  const response = usersService.getBalance(userId);
  res.send(response);
};
export const getTransactions = (req: Request, res: Response) => {
  const userId = req.params.id;
  const filter = req.query as IDataFilter;
  const response = usersService.getTransactions(userId, filter);
  res.send(response);
};
export const postTransaction = (req: Request, res: Response) => {
  const userId = req.params.id;
  const transaction = req.body as IUserTransactionRequest;
  const response = usersService.createTransaction(userId, transaction);
  res.send(response);
};

/** @format */

import { Request, Response } from 'express';
import { IUserTransactionPost, IUserTransactionsFilter } from '../../types/userTransactionsTypes';
import { transactionsService } from './transactionsService';

export const get = (req: Request, res: Response) => {
  const filter = req.body as IUserTransactionsFilter;
  const response = transactionsService.get(filter);
  res.send(response);
};

export const post = (req: Request, res: Response) => {
  const transaction = req.body as IUserTransactionPost;
  const response = transactionsService.add(transaction);
  res.send(response);
};

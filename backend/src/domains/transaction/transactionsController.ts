/** @format */

import { Request, Response } from 'express';
import { IUserTransactionPost, IUserTransactionsFilter } from '../../types/UserTransactionsTypes';
import { transactionsService } from './transactionsService';

export const get = (req: Request, res: Response) => {
  const userId = req.params.userId;
  const filter = req.query as IUserTransactionsFilter;
  const response = transactionsService.get(userId, filter);
  res.send(response);
};

export const post = (req: Request, res: Response) => {
  const userId = req.params.userId;
  const transaction = req.body as IUserTransactionPost;
  const response = transactionsService.add(userId, transaction);
  res.send(response);
};

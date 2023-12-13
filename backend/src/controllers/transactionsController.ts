/** @format */

import { Request, Response } from 'express';

export const getTransactions = (req: Request, res: Response) => {
  res.send('Hello from the getUserTransactions controller!');
};

export const postTransaction = (req: Request, res: Response) => {
  res.send('Hello from the addTransaction controller!');
};

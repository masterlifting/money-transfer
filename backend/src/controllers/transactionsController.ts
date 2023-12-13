/** @format */

import { Request, Response } from 'express';
import { repository } from '../persistence/DbRepository';
import {
  IUserTransactionGet,
  IUserTransactionPost,
  IUserTransactionsFilter,
  IUserTransactionsGet,
} from '../types/UserTransactionsTypes';
import { WebApiResponseType } from '../types/WebApiTypes';

export const getTransactions = (req: Request, res: Response) => {
  const userId = req.params.userId;
  const filter: IUserTransactionsFilter = req.query;

  const response: WebApiResponseType<IUserTransactionsGet> = {
    isSuccess: true,
    data: repository.transactions.get(userId, filter),
  };

  res.send(response);
};

export const postTransaction = (req: Request, res: Response) => {
  const userId = req.params.userId;
  const transaction: IUserTransactionPost = req.body;

  const sender = user;
  const receiver = _users.find(x => x.id === transaction.user.id);

  if (!receiver) {
    throw new Error('Receiver not found');
  }

  var senderTransaction: IUserTransactionGet = {
    id: guid(),
    date: new Date(),
    type: 'Outcome',
    status: 'Pending',
    amount: transaction.amount,
    user: receiver,
  };

  var receiverTransaction: IUserTransactionGet = {
    id: guid(),
    date: new Date(),
    type: 'Income',
    status: 'Completed',
    amount: transaction.amount,
    user: sender,
  };

  repository.transactions.add(sender, senderTransaction);
  repository.transactions.add(receiver, receiverTransaction);

  return Promise.resolve(senderTransaction);
};

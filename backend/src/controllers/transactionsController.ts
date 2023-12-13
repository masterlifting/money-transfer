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
import { v4 as guid } from 'uuid';

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

  let response: WebApiResponseType<IUserTransactionGet>;

  const sender = repository.users.getById(userId);

  if (!sender) {
    response = {
      isSuccess: false,
      error: {
        code: 404,
        message: 'User not found',
      },
    };

    res.send(response);
    return;
  }

  const receiver = repository.users.getById(transaction.user.id);

  if (!receiver) {
    response = {
      isSuccess: false,
      error: {
        code: 404,
        message: 'Receiver not found',
      },
    };

    res.send(response);
    return;
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

  try {
    repository.transactions.add(sender.id, senderTransaction);
    repository.transactions.add(receiver.id, receiverTransaction);

    response = {
      isSuccess: true,
      data: senderTransaction,
    };
  } catch (error: any) {
    response = {
      isSuccess: false,
      error: {
        code: 400,
        message: error.message,
      },
    };
  }

  res.send(response);
};

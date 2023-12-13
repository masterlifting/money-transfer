/** @format */

import {
  IUserTransactionGet,
  IUserTransactionPost,
  IUserTransactionsFilter,
  IUserTransactionsGet,
} from '../../types/UserTransactionsTypes';
import { WebApiResponseType } from '../../types/WebApiTypes';
import { usersRepository } from '../user/usersRepository';
import { transactionsRepository } from './transactionsRepository';
import { v4 as guid } from 'uuid';

export const transactionsService = {
  get: (userId: string, filter: IUserTransactionsFilter): WebApiResponseType<IUserTransactionsGet> => {
    return {
      isSuccess: true,
      data: transactionsRepository.get(userId, filter),
    };
  },

  add: (userId: string, transaction: IUserTransactionPost): WebApiResponseType<IUserTransactionGet> => {
    const sender = usersRepository.getById(userId);

    if (!sender) {
      return {
        isSuccess: false,
        error: {
          code: 404,
          message: 'User not found',
        },
      };
    }

    const receiver = usersRepository.getById(transaction.user.id);

    if (!receiver) {
      return {
        isSuccess: false,
        error: {
          code: 404,
          message: 'Receiver not found',
        },
      };
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
      transactionsRepository.add(sender.id, senderTransaction);
      transactionsRepository.add(receiver.id, receiverTransaction);

      return {
        isSuccess: true,
        data: senderTransaction,
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        error: {
          code: 400,
          message: error.message,
        },
      };
    }
  },
};

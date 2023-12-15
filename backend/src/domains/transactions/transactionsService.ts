/** @format */

import { HandledError } from '../../shred/errorTypes';
import {
  IUserTransactionGet,
  IUserTransactionPost,
  IUserTransactionsFilter,
  IUserTransactionsGet,
} from '../../types/userTransactionsTypes';
import { WebApiResponseType } from '../../types/webApiTypes';
import { usersRepository } from '../users/usersRepository';
import { transactionsRepository } from './transactionsRepository';
import { v4 as guid } from 'uuid';

export const transactionsService = {
  get: (filter: IUserTransactionsFilter): WebApiResponseType<IUserTransactionsGet> => {
    return {
      isSuccess: true,
      data: transactionsRepository.get(filter),
    };
  },

  add: (transaction: IUserTransactionPost): WebApiResponseType<IUserTransactionGet> => {
    const sender = usersRepository.getById(transaction.senderId);

    if (!sender) {
      throw new HandledError('Sender not found');
    }

    const receiver = usersRepository.getById(transaction.user.id);

    if (!receiver) {
      throw new HandledError('Receiver not found');
    }

    var senderTransaction: IUserTransactionGet = {
      id: guid(),
      date: new Date(),
      type: 'Outcome',
      status: 'Completed',
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

    transactionsRepository.add(sender.id, senderTransaction);
    transactionsRepository.add(receiver.id, receiverTransaction);

    return {
      isSuccess: true,
      data: senderTransaction,
    };
  },
};

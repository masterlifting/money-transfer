/** @format */

import { IAuthUserGet, IAuthUserPost } from '../../shared/types/AuthTypes';
import { IUserBalanceGet } from '../../shared/types/UserBalanceTypes';
import {
  IUserTransactionGet,
  IUserTransactionPost,
  IUserTransactionsFilter,
  IUserTransactionsGet,
} from '../../shared/types/UserTransactionsTypes';
import { IUserGet } from '../../shared/types/UserTypes';
import { v4 as guid } from 'uuid';

export const backendGetUserBalance = (user: IAuthUserGet): Promise<IUserBalanceGet> => Promise.resolve(getBalance(user));

export const backendPostUserTransaction = (
  user: IAuthUserGet,
  transaction: IUserTransactionPost,
): Promise<IUserTransactionGet> => {
  const sender = user;
  const receiver = _users.find(x => x.id === transaction.user.id);

  if (!receiver) {
    throw new Error('Receiver not found');
  }

  // this status behavior is only for demo purposes

  _transactions.get(user.id)?.forEach(x => {
    x.status = 'Completed';
  });

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

  addTransaction(sender, senderTransaction);
  addTransaction(receiver, receiverTransaction);

  return Promise.resolve(senderTransaction);
};

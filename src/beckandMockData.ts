/** @format */

import { IAuthUserGet, IAuthUserPost } from './domains/auth/AuthTypes';
import { IUserBalanceGet } from './domains/user/balance/UserBalanceTypes';
import {
  IUserTransactionGet,
  IUserTransactionPost,
  IUserTransactionStatusGet,
} from './domains/user/transactions/UserTransactionsTypes';
import { IUserGet } from './domains/user/types/UserTypes';
import { v4 as guid } from 'uuid';

const generateRandomTransactions = (users: IUserGet[]): IUserTransactionGet[] => {
  const transactions: IUserTransactionGet[] = [];

  for (let i = 0; i < 100; i++) {
    const transaction: IUserTransactionGet = {
      id: guid(),
      type: Math.random() < 0.5 ? 'income' : 'outcome',
      status: Math.random() < 0.5 ? 'completed' : 'pending',
      date: new Date(),
      amount: Math.floor(Math.random() * 1000),
      user: users[Math.floor(Math.random() * users.length)],
    };

    transactions.push(transaction);
  }

  return transactions;
};

const beckendUsers: IUserGet[] = [
  {
    id: guid(),
    email: 'jack@gmail.com',
  },
  {
    id: guid(),
    email: 'bob@gmail.com',
  },
  {
    id: guid(),
    email: 'alice@gmail.com',
  },
  {
    id: guid(),
    email: 'serhio@gmail.com',
  },
  {
    id: guid(),
    email: 'milica@gmail.com',
  },
];

const beckendTransactions = generateRandomTransactions(beckendUsers);

const getUserBalanceValue = (user: IUserGet) =>
  beckendTransactions
    .filter(transaction => transaction.user.id === user.id)
    .reduce((acc, transaction) => (transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount), 0);

const beckendUserBalances: IUserBalanceGet[] = beckendUsers.map(user => ({
  userId: user.id,
  balance: getUserBalanceValue(user),
  currency: 'USD',
  symbol: '$',
}));

//Mock controllers

export const backendGetUsers = async (): Promise<IUserGet[]> => beckendUsers;

export const backendAuthorizeUser = async (user: IAuthUserPost): Promise<IAuthUserGet> => {
  const userGet = beckendUsers.find(x => x.email === user.email);

  if (userGet) {
    return { ...userGet, token: guid(), refreshToken: guid() };
  } else {
    throw new Error('User not found');
  }
};

export const backendRegisterUser = async (user: IAuthUserPost): Promise<IAuthUserGet> => {
  const userGet = beckendUsers.find(x => x.email === user.email);

  if (userGet) {
    throw new Error('User already exists');
  } else {
    const newUser: IUserGet = {
      id: guid(),
      email: user.email,
    };

    beckendUsers.push(newUser);

    return { ...newUser, token: guid(), refreshToken: guid() };
  }
};

export const backendGetTransactions = async (): Promise<IUserTransactionGet[]> => beckendTransactions;

export const backendPostTransaction = async (transaction: IUserTransactionPost): Promise<IUserTransactionGet> => {
  var transactionGet: IUserTransactionGet = {
    id: guid(),
    date: new Date(),
    type: 'outcome',
    status: 'pending',
    amount: transaction.amount,
    user: transaction.user,
  };

  beckendTransactions.push(transactionGet);

  return transactionGet;
};

export const beckendGetTransactionsStatuses = async (transactions: IUserTransactionGet[]): Promise<IUserTransactionStatusGet[]> =>
  beckendTransactions
    .filter(transaction => transactions.some(t => t.id === transaction.id))
    .map(transaction => ({
      id: transaction.id,
      status: transaction.status,
    }));

export const backendGetUserBalance = async (user: IAuthUserGet): Promise<IUserBalanceGet> => {
  const userBalance = beckendUserBalances.find(x => x.userId === user.id);

  if (userBalance) {
    return userBalance;
  } else {
    throw new Error('User balance not found');
  }
};

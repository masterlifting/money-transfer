/** @format */

import { IAuthUserGet, IAuthUserPost } from './domains/auth/AuthTypes';
import { IUserBalanceGet } from './domains/user/balance/UserBalanceTypes';
import {
  IUserTransactionGet,
  IUserTransactionPost,
  IUserTransactionStatusGet,
  IUserTransactionsFilter,
  IUserTransactionsGet,
} from './domains/user/transactions/UserTransactionsTypes';
import { IUserGet } from './domains/user/types/UserTypes';
import { v4 as guid } from 'uuid';

const generateRandomTransactions = (users: IUserGet[]): IUserTransactionGet[] => {
  const transactions: IUserTransactionGet[] = [];

  for (let i = 0; i < 10; i++) {
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

const users: IUserGet[] = [
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

const transactions = generateRandomTransactions(users);

const getUserBalanceValue = (user: IUserGet) =>
  transactions
    .filter(transaction => transaction.user.id !== user.id)
    .reduce((acc, transaction) => (transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount), 0);

const getUserBalance = (user: IUserGet): IUserBalanceGet => ({
  userId: user.id,
  value: getUserBalanceValue(user),
  currency: 'USD',
  symbol: '$',
});

const getUserTransactions = (user: IUserGet, filter: IUserTransactionsFilter): IUserTransactionsGet => {
  const userTransactions = transactions.filter(x => x.user.id !== user.id);

  const sortedTransactions = userTransactions.sort((a, b) => {
    const valueA = a[filter.sortField as keyof IUserTransactionGet];
    const valueB = b[filter.sortField as keyof IUserTransactionGet];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return filter.sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    } else if (typeof valueA === 'number' && typeof valueB === 'number') {
      return filter.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
    } else if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
      return filter.sortDirection === 'asc' ? (valueA ? 1 : -1) : valueB ? 1 : -1;
    } else if (valueA instanceof Date && valueB instanceof Date) {
      return filter.sortDirection === 'asc' ? valueA.getTime() - valueB.getTime() : valueB.getTime() - valueA.getTime();
    } else if ((valueA as IUserGet) && (valueB as IUserGet)) {
      const userA = valueA as IUserGet;
      const userB = valueB as IUserGet;
      return filter.sortDirection === 'asc' ? userA.email.localeCompare(userB.email) : userB.email.localeCompare(userA.email);
    }

    return 0;
  });

  const totalCount = sortedTransactions.length;
  const items = sortedTransactions.slice(
    filter.totalItemsCount * (filter.pageNumber - 1),
    filter.totalItemsCount * filter.pageNumber,
  );

  return {
    totalCount,
    items,
  };
};

//Mock controllers

export const backendGetUsers = async (): Promise<IUserGet[]> => users;

export const backendAuthorizeUser = async (user: IAuthUserPost): Promise<IAuthUserGet> => {
  const userGet = users.find(x => x.email === user.email);

  if (userGet) {
    return { ...userGet, token: guid(), refreshToken: guid() };
  } else {
    throw new Error('User not found');
  }
};

export const backendRegisterUser = async (user: IAuthUserPost): Promise<IAuthUserGet> => {
  const userGet = users.find(x => x.email === user.email);

  if (userGet) {
    throw new Error('User already exists');
  } else {
    const newUser: IUserGet = {
      id: guid(),
      email: user.email,
    };

    users.push(newUser);

    return { ...newUser, token: guid(), refreshToken: guid() };
  }
};

export const backendGetTransactions = async (authUser: IAuthUserGet): Promise<IUserTransactionsGet> => {
  const userTransactions = transactions.filter(x => x.user.id !== authUser.id);

  return {
    totalCount: userTransactions.length,
    items: userTransactions,
  };
};

export const backendGetFilteredUserTransactions = async (
  authUser: IAuthUserGet,
  filter: IUserTransactionsFilter,
): Promise<IUserTransactionsGet> => getUserTransactions(authUser, filter);

export const backendPostTransaction = async (
  user: IAuthUserGet,
  transaction: IUserTransactionPost,
): Promise<IUserTransactionGet> => {
  const userBalance = getUserBalanceValue(user);

  if (userBalance <= 0 || userBalance < transaction.amount) {
    throw new Error('Not enough money');
  }

  var transactionGet: IUserTransactionGet = {
    id: guid(),
    date: new Date(),
    type: 'outcome',
    status: 'pending',
    amount: transaction.amount,
    user: transaction.user,
  };

  transactions.push(transactionGet);

  return transactionGet;
};

export const backendGetTransactionsStatuses = async (transactions: IUserTransactionGet[]): Promise<IUserTransactionStatusGet[]> =>
  transactions
    .filter(transaction => transactions.some(t => t.id === transaction.id))
    .map(transaction => ({
      id: transaction.id,
      status: transaction.status,
    }));

export const backendGetUserBalance = async (user: IAuthUserGet): Promise<IUserBalanceGet> => getUserBalance(user);

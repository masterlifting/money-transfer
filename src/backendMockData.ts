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

interface IBackendTransaction {
  user: IUserGet;
  transactions: IUserTransactionGet[];
}

const users: IUserGet[] = [];
const transactions: IBackendTransaction[] = [];
const balances: IUserBalanceGet[] = [];

const setUserBalance = (user: IUserGet, value: number) => {
  const userBalance = balances.find(x => x.userId === user.id);

  if (userBalance) {
    userBalance.value += value;
  } else {
    balances.push({
      userId: user.id,
      value: value,
      currency: 'USD',
      symbol: '$',
    });
  }
};

const getUserBalance = (user: IUserGet): IUserBalanceGet =>
  balances.find(x => x.userId === user.id) ?? {
    userId: user.id,
    value: 0,
    currency: 'USD',
    symbol: '$',
  };

const getUserTransactions = (user: IUserGet, filter: IUserTransactionsFilter): IUserTransactionsGet => {
  let userTransactions = transactions
    .filter(x => x.user.id === user.id)
    .reduce((acc, x) => [...acc, ...x.transactions], [] as IUserTransactionGet[]);

  if (filter.sorting) {
    userTransactions = userTransactions.sort((a, b) => {
      const valueA = a[filter.sorting!.fieldName as keyof IUserTransactionGet];
      const valueB = b[filter.sorting!.fieldName as keyof IUserTransactionGet];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return filter.sorting!.direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return filter.sorting!.direction === 'asc' ? valueA - valueB : valueB - valueA;
      }

      if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
        return filter.sorting!.direction === 'asc' ? (valueA ? 1 : -1) : valueB ? 1 : -1;
      }

      if (valueA instanceof Date && valueB instanceof Date) {
        return filter.sorting!.direction === 'asc' ? valueA.getTime() - valueB.getTime() : valueB.getTime() - valueA.getTime();
      }

      if ((valueA as IUserGet) && (valueB as IUserGet)) {
        const userA = valueA as IUserGet;
        const userB = valueB as IUserGet;
        return filter.sorting!.direction === 'asc'
          ? userA.email.localeCompare(userB.email)
          : userB.email.localeCompare(userA.email);
      }

      return 0;
    });
  }

  const totalCount = userTransactions.length;
  let items = userTransactions;
  if (filter.pagination) {
    items = userTransactions.slice(
      filter.pagination.pageItemsCount * (filter.pagination.pageNumber - 1),
      filter.pagination.pageItemsCount * filter.pagination.pageNumber,
    );
  }

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

    transactions.push({
      user: newUser,
      transactions: [
        {
          id: guid(),
          date: new Date(),
          type: 'Income',
          status: 'Completed',
          amount: 500,
          user: {
            id: guid(),
            email: 'internalmoney@gmail.com',
          },
        },
      ],
    });

    return { ...newUser, token: guid(), refreshToken: guid() };
  }
};

export const backendGetUserTransactions = async (
  authUser: IAuthUserGet,
  filter: IUserTransactionsFilter,
): Promise<IUserTransactionsGet> => getUserTransactions(authUser, filter);

export const backendPostUserTransaction = async (
  user: IAuthUserGet,
  transaction: IUserTransactionPost,
): Promise<IUserTransactionGet> => {
  const userBalance = getUserBalance(user);

  if (userBalance.value <= 0 || userBalance.value < transaction.amount) {
    throw new Error('Not enough money');
  }

  var newTransaction: IUserTransactionGet = {
    id: guid(),
    date: new Date(),
    type: 'Outcome',
    status: 'Pending',
    amount: transaction.amount,
    user: transaction.user,
  };

  const userTransactions = transactions.find(x => x.user.id === user.id);

  if (userTransactions) {
    userTransactions.transactions.push(newTransaction);
  } else {
    transactions.push({
      user: user,
      transactions: [newTransaction],
    });
  }

  setUserBalance(user, -transaction.amount);

  return newTransaction;
};

export const backendGetTransactionsStatuses = async (transactions: IUserTransactionGet[]): Promise<IUserTransactionStatusGet[]> =>
  transactions
    .filter(transaction => transactions.some(t => t.id === transaction.id))
    .map(transaction => ({
      id: transaction.id,
      status: transaction.status,
    }));

export const backendGetUserBalance = async (user: IAuthUserGet): Promise<IUserBalanceGet> => getUserBalance(user);

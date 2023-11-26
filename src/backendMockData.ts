/** @format */

import { IAuthUserGet, IAuthUserPost } from './domains/auth/AuthTypes';
import { IUserBalanceGet } from './domains/user/balance/UserBalanceTypes';
import {
  IUserTransactionGet,
  IUserTransactionPost,
  IUserTransactionsFilter,
  IUserTransactionsGet,
} from './domains/user/transactions/UserTransactionsTypes';
import { IUserGet } from './domains/user/types/UserTypes';
import { v4 as guid } from 'uuid';

//Users controller
const _users: IUserGet[] = [];

export const backendGetUsers = (): Promise<IUserGet[]> => Promise.resolve(_users);

export const backendAuthorizeUser = (user: IAuthUserPost): Promise<IAuthUserGet> => {
  const userGet = _users.find(x => x.email === user.email);

  if (userGet) {
    return Promise.resolve({ ...userGet, token: guid(), refreshToken: guid() });
  } else {
    throw new Error('User not found');
  }
};

export const backendRegisterUser = (user: IAuthUserPost): Promise<IAuthUserGet> => {
  let newUser = _users.find(x => x.email === user.email);

  if (newUser) {
    throw new Error('User already exists');
  } else {
    newUser = {
      id: guid(),
      email: user.email,
    };

    _users.push(newUser);

    const presentTransaction: IUserTransactionGet = {
      id: guid(),
      date: new Date(),
      type: 'Income',
      status: 'Completed',
      amount: {
        value: 500,
        currency: 'USD',
        symbol: '$',
      },
      user: {
        id: guid(),
        email: 'internalmoney@gmail.com',
      },
      description: 'Welcome bonus from Internal Money',
    };

    addTransaction(newUser, presentTransaction);

    return Promise.resolve({ ...newUser, token: guid(), refreshToken: guid() });
  }
};

//Transactions controller
const _balances = new Map<string, IUserBalanceGet>();
const _transactions = new Map<string, IUserTransactionGet[]>();

const getBalance = (user: IUserGet): IUserBalanceGet => {
  let balance = _balances.get(user.id);

  if (!balance) {
    balance = {
      user: user,
      amount: {
        value: 0,
        currency: 'USD',
        symbol: '$',
      },
    };

    _balances.set(user.id, balance);
  }

  return balance;
};

const setBalance = (user: IUserGet, value: number) => {
  const balance = getBalance(user);
  const newValue = balance.amount.value + value;

  if (newValue < 0) {
    throw new Error('Not enough money');
  }

  _balances.set(user.id, { ...balance, amount: { ...balance.amount, value: newValue } });
};

const addTransaction = (user: IUserGet, transaction: IUserTransactionGet) => {
  if (transaction.type === 'Income') {
    setBalance(user, transaction.amount.value);
  } else {
    setBalance(user, -transaction.amount.value);
  }

  const userTransactions = _transactions.get(user.id);

  if (userTransactions) {
    userTransactions.push(transaction);
  } else {
    _transactions.set(user.id, [transaction]);
  }
};

export const backendGetUserTransactions = (
  user: IAuthUserGet,
  filter: IUserTransactionsFilter,
): Promise<IUserTransactionsGet> => {
  let userTransactions = _transactions.get(user.id) ?? [];

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

  return Promise.resolve({
    totalCount,
    items,
  });
};

export const backendPostUserTransaction = (
  user: IAuthUserGet,
  transaction: IUserTransactionPost,
): Promise<IUserTransactionGet> => {
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
    user: transaction.user,
  };

  addTransaction(user, senderTransaction);

  addTransaction(receiver, {
    id: guid(),
    date: new Date(),
    type: 'Income',
    status: 'Completed',
    amount: transaction.amount,
    user: user,
  });

  return Promise.resolve(senderTransaction);
};

export const backendGetUserBalance = (user: IAuthUserGet): Promise<IUserBalanceGet> => Promise.resolve(getBalance(user));

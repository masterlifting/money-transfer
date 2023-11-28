/** @format */

import { IAuthUserGet, IAuthUserPost } from './domains/auth/AuthTypes';
import { IUserBalanceGet } from './domains/balance/UserBalanceTypes';
import {
  IUserTransactionGet,
  IUserTransactionPost,
  IUserTransactionsFilter,
  IUserTransactionsGet,
} from './domains/transactions/UserTransactionsTypes';
import { IUserGet } from './shared/types/UserTypes';
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
  const transactionAmount = transaction.type === 'Income' ? transaction.amount.value : -transaction.amount.value;

  transaction = { ...transaction, amount: { ...transaction.amount, value: transactionAmount } };

  setBalance(user, transaction.amount.value);

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
    const compareNumbers = (a: number, b: number, direction: 'asc' | 'desc') => (direction === 'asc' ? a - b : b - a);
    const compareStrings = (a: string, b: string, direction: 'asc' | 'desc') =>
      direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
    const compareDates = (a: Date, b: Date, direction: 'asc' | 'desc') =>
      direction === 'asc' ? a.getTime() - b.getTime() : b.getTime() - a.getTime();

    userTransactions = userTransactions.sort((a, b) => {
      switch (filter.sorting?.fieldName) {
        case 'date':
          return compareDates(a.date, b.date, filter.sorting.direction);
        case 'type':
          return compareStrings(a.type, b.type, filter.sorting.direction);
        case 'status':
          return compareStrings(a.status, b.status, filter.sorting.direction);
        case 'user':
          return compareStrings(a.user.email, b.user.email, filter.sorting.direction);
        case 'amount':
          return compareNumbers(a.amount.value, b.amount.value, filter.sorting.direction);
        default:
          return 0;
      }
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

export const backendGetUserBalance = (user: IAuthUserGet): Promise<IUserBalanceGet> => Promise.resolve(getBalance(user));

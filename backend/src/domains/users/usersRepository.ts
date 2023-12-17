/** @format */

import { HandledError } from '../../shred/errorTypes';
import { IUser, IUserBalance, IUserCreate, IUserTransaction, IUserTransactionCreate, IUserTransactions } from '../interfaces';
import { IAmount, IDataFilter } from '../../interfaces';
import { v4 as guid } from 'uuid';
import { SortingDirectionType, UserTransactionType } from '../../types';

interface IUserState extends IUser {
  balance: IUserBalance;
  transactions: IUserTransactions;
}

const usersState: IUserState[] = [];

export const usersRepository = {
  get: (filter?: IDataFilter): IUser[] => usersState.map(x => ({ id: x.id, email: x.email })),
  getById: (userId: string): IUser | undefined => {
    const user = usersState.find(x => x.id === userId);

    if (!user) {
      return undefined;
    }

    return { id: user.id, email: user.email };
  },
  getByEmail: (email: string): IUser | undefined => {
    const user = usersState.find(x => x.email === email);

    if (!user) {
      return undefined;
    }

    return { id: user.id, email: user.email };
  },
  create: (user: IUserCreate): IUser => {
    const userExists = usersState.find(x => x.email === user.email);

    if (userExists) {
      throw new HandledError('User already exists');
    }

    const userState: IUserState = {
      ...user,
      id: guid(),
      balance: {
        amount: {
          value: 0,
          currency: 'USD',
          symbol: '$',
        },
      },
      transactions: {
        totalCount: 0,
        items: [],
      },
    };

    usersState.push(userState);

    return { id: userState.id, email: userState.email };
  },
  getBalance: (userId: string): IUserBalance => {
    const user = usersState.find(x => x.id === userId);

    if (!user) {
      throw new HandledError('User not found');
    }

    return user.balance;
  },
  updateBalance: (userId: string, amountValue: number): IUserBalance => {
    const user = usersState.find(x => x.id === userId);

    if (!user) {
      throw new HandledError('User not found');
    }

    const balanceAmount = user.balance.amount.value + amountValue;

    if (balanceAmount < 0) {
      throw new HandledError('Not enough money');
    }

    user.balance = {
      ...user.balance,
      amount: {
        ...user.balance.amount,
        value: balanceAmount,
      },
    };

    return user.balance;
  },
  getTransactions: (userId: string, filter?: IDataFilter): IUserTransactions => {
    const user = usersState.find(x => x.id === userId);

    if (!user) {
      throw new HandledError('User not found');
    }

    let transactions = user.transactions.items;

    if (!filter) {
      return {
        totalCount: user.transactions.totalCount,
        items: transactions,
      };
    }

    if (filter.sortingFieldName && filter.sortingDirection) {
      const compareNumbers = (a: number, b: number, direction: SortingDirectionType) => (direction === 'asc' ? a - b : b - a);
      const compareStrings = (a: string, b: string, direction: SortingDirectionType) =>
        direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
      const compareDates = (a: Date, b: Date, direction: SortingDirectionType) =>
        direction === 'asc' ? a.getTime() - b.getTime() : b.getTime() - a.getTime();

      transactions = transactions.sort((a, b) => {
        switch (filter.sortingFieldName) {
          case 'date':
            return compareDates(a.date, b.date, filter.sortingDirection!);
          case 'type':
            return compareStrings(a.type, b.type, filter.sortingDirection!);
          case 'status':
            return compareStrings(a.status, b.status, filter.sortingDirection!);
          case 'user':
            return compareStrings(a.user.email, b.user.email, filter.sortingDirection!);
          case 'amount':
            return compareNumbers(a.amount.value, b.amount.value, filter.sortingDirection!);
          default:
            return 0;
        }
      });
    }

    if (filter.pageItemsCount && filter.pageNumber) {
      transactions = transactions.slice(
        filter.pageItemsCount * (filter.pageNumber - 1),
        filter.pageItemsCount * filter.pageNumber,
      );
    }

    return {
      totalCount: user.transactions.totalCount,
      items: transactions,
    };
  },
  createTransaction: (userId: string, transaction: IUserTransactionCreate): IUserTransaction => {
    const user = usersState.find(x => x.id === userId);

    if (!user) {
      throw new HandledError('User not found');
    }

    const transactionAmount = transaction.type === 'Income' ? transaction.amount.value : -transaction.amount.value;

    const newTransaction: IUserTransaction = {
      ...transaction,
      amount: { ...transaction.amount, value: transactionAmount },
      id: guid(),
      date: new Date(),
      status: 'Completed',
    };

    usersRepository.updateBalance(user.id, newTransaction.amount.value);

    user.transactions.items.push(newTransaction);
    user.transactions.totalCount++;

    return newTransaction;
  },
};

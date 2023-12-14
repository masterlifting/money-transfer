/** @format */

import { IUserTransactionGet, IUserTransactionsFilter, IUserTransactionsGet } from '../../types/userTransactionsTypes';
import { usersRepository } from '../users/usersRepository';

const transactions = new Map<string, IUserTransactionGet[]>();

export const transactionsRepository = {
  get: (filter: IUserTransactionsFilter): IUserTransactionsGet => {
    if (!filter.userId) {
      return {
        totalCount: 0,
        items: [],
      };
    }

    let userTransactions = transactions.get(filter.userId) ?? [];

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

    return {
      totalCount,
      items,
    };
  },

  add: (userId: string, transaction: IUserTransactionGet) => {
    const transactionAmount = transaction.type === 'Income' ? transaction.amount.value : -transaction.amount.value;

    transaction = { ...transaction, amount: { ...transaction.amount, value: transactionAmount } };

    usersRepository.setBalance(userId, transaction.amount.value);

    const userTransactions = transactions.get(userId);

    if (userTransactions) {
      userTransactions.push(transaction);
    } else {
      transactions.set(userId, [transaction]);
    }
  },
};

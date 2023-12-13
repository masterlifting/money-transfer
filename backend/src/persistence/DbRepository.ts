/** @format */
import { IUserGet } from '../types/UserTypes';
import { IUserBalanceGet } from '../types/UserBalanceTypes';
import { IUserTransactionGet, IUserTransactionsFilter, IUserTransactionsGet } from '../types/UserTransactionsTypes';

const users: IUserGet[] = [];
const balances = new Map<string, IUserBalanceGet>();
const transactions = new Map<string, IUserTransactionGet[]>();

export const repository = {
  users: {
    getAll: () => users,
    getById: (userId: string) => users.find(x => x.id === userId),
    getByEmail: (email: string) => users.find(x => x.email === email),
    add: (user: IUserGet) => {
      users.push(user);
    },
    getBalance: (userId: string) => {
      const user = users.find(x => x.id === userId);

      if (!user) {
        throw new Error('User not found');
      }

      let balance = balances.get(userId);

      if (!balance) {
        balance = {
          user: user,
          amount: {
            value: 0,
            currency: 'USD',
            symbol: '$',
          },
        };

        balances.set(user.id, balance);
      }

      return balance;
    },
    setBalance: (userId: string, value: number) => {
      const balance = repository.users.getBalance(userId);
      const newValue = balance.amount.value + value;

      if (newValue < 0) {
        throw new Error('Not enough money');
      }

      balances.set(userId, { ...balance, amount: { ...balance.amount, value: newValue } });
    },
  },
  transactions: {
    add: (userId: string, transaction: IUserTransactionGet) => {
      const transactionAmount = transaction.type === 'Income' ? transaction.amount.value : -transaction.amount.value;

      transaction = { ...transaction, amount: { ...transaction.amount, value: transactionAmount } };

      repository.users.setBalance(userId, transaction.amount.value);

      const userTransactions = transactions.get(userId);

      if (userTransactions) {
        userTransactions.push(transaction);
      } else {
        transactions.set(userId, [transaction]);
      }
    },
    get: (userId: string, filter: IUserTransactionsFilter) => {
      let userTransactions = transactions.get(userId) ?? [];

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

      const result: IUserTransactionsGet = {
        totalCount,
        items,
      };

      return result;
    },
  },
};

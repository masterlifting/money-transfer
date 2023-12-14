/** @format */

import { IUserBalanceGet } from '../../types/userBalanceTypes';
import { IUserGet } from '../../types/userTypes';

const users: IUserGet[] = [];
const userBalances = new Map<string, IUserBalanceGet>();

export const usersRepository = {
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

    let balance = userBalances.get(userId);

    if (!balance) {
      balance = {
        user: user,
        amount: {
          value: 0,
          currency: 'USD',
          symbol: '$',
        },
      };

      userBalances.set(user.id, balance);
    }

    return balance;
  },
  setBalance: (userId: string, value: number) => {
    const balance = usersRepository.getBalance(userId);
    const newValue = balance.amount.value + value;

    if (newValue < 0) {
      throw new Error('Not enough money');
    }

    userBalances.set(userId, { ...balance, amount: { ...balance.amount, value: newValue } });
  },
};

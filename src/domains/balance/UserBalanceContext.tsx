/** @format */

import { createContext, useState } from 'react';
import { IUserBalanceContext, IUserBalanceGet } from './UserBalanceTypes';
import { fetchUserBalance } from './UserBalanceData';
import { IAuthUserGet } from '../auth/AuthTypes';

export const UserBalanceContext = createContext<IUserBalanceContext>({
  userBalance: undefined,
  updateUserBalance: (user?: IAuthUserGet) => {},
});

export const UserBalanceStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [userBalance, setBalance] = useState<IUserBalanceGet>();

  const updateUserBalance = (user: IAuthUserGet) => {
    fetchUserBalance(user).then(response => {
      if (response.isSuccess) {
        setBalance(response.data);
      } else {
        throw new Error(response.error.message);
      }
    });
  };

  return <UserBalanceContext.Provider value={{ userBalance, updateUserBalance }}>{children}</UserBalanceContext.Provider>;
};

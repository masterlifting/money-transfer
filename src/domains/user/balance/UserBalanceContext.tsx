/** @format */

import { createContext, useState } from 'react';
import { IUserBalanceGet } from './UserBalanceTypes';
import { fetchUserBalance } from './UserBalanceData';
import { IAuthUserGet } from '../../auth/AuthTypes';

interface IUserBalanceContext {
  userBalance?: IUserBalanceGet;
  updateUserBalance: (user: IAuthUserGet) => void;
}

export const UserBalanceContext = createContext<IUserBalanceContext>({
  userBalance: undefined,
  updateUserBalance: (user?: IAuthUserGet) => {},
});

export const UserBalanceState = ({ children }: { children: React.ReactNode }) => {
  const [userBalance, setBalance] = useState<IUserBalanceGet>();

  const updateUserBalance = (user: IAuthUserGet) => {
    fetchUserBalance(user).then(x => {
      if (x.isSuccess) {
        setBalance(x.data);
      } else {
        throw new Error(x.error.message);
      }
    });
  };

  return <UserBalanceContext.Provider value={{ userBalance, updateUserBalance }}>{children}</UserBalanceContext.Provider>;
};

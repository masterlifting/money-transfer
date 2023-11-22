/** @format */

import { createContext, useState } from 'react';
import { IUserBalanceGet } from './UserBalanceTypes';
import { fetchUserBalance } from './UserBalanceData';
import { IAuthUserGet } from '../../auth/AuthTypes';

interface IUserBalanceContext {
  userBalance: IUserBalanceGet;
  updateUserBalance: (user?: IAuthUserGet) => void;
}

export const UserBalanceContext = createContext<IUserBalanceContext>({
  userBalance: { symbol: '$', value: 0 } as IUserBalanceGet,
  updateUserBalance: (user?: IAuthUserGet) => {},
});

export const UserBalanceState = ({ children }: { children: React.ReactNode }) => {
  const [userBalance, setBalance] = useState<IUserBalanceGet>({ symbol: '$', value: 0 } as IUserBalanceGet);

  const updateUserBalance = (user?: IAuthUserGet) => {
    if (!user) {
      throw new Error('User is not defined');
    }

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

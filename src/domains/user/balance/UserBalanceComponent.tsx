/** @format */

import { useEffect, useState } from 'react';
import { IAuthUserGet } from '../../auth/AuthTypes';
import { IUserBalanceGet } from './UserBalanceTypes';
import { fetchUserBalance } from './UserBalanceData';

interface IUserBalanceProps {
  user: IAuthUserGet;
}

export const UserBalance = ({ user }: IUserBalanceProps) => {
  const [balance, setBalance] = useState<IUserBalanceGet | undefined>();

  useEffect(() => {
    fetchUserBalance(user).then(x => {
      if (x.isSuccess) {
        setBalance(x.data);
      }
    });
  }, [user]);

  return balance ? (
    <span className='text-yellow-400 font-bold'>
      {balance.symbol}
      {balance.balance}
    </span>
  ) : null;
};

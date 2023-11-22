/** @format */

import { useEffect, useState } from 'react';
import { IAuthUserGet } from '../../auth/AuthTypes';
import { IUserBalanceGet } from './UserBalanceTypes';
import { fetchUserBalance } from './UserBalanceData';

interface IUserBalanceProps {
  user: IAuthUserGet;
}

export const UserBalance = ({ user }: IUserBalanceProps) => {
  const [balance, setBalance] = useState<IUserBalanceGet>({
    balance: 0,
    currency: 'USD',
    symbol: '$',
  });

  useEffect(() => {
    const fetchUserBalanceData = async () => {
      const userBalance = await fetchUserBalance(user);
      setBalance(userBalance);
    };

    fetchUserBalanceData();
  }, [user]);

  return (
    <span className='text-yellow-400 font-bold'>
      {balance.symbol}
      {balance.balance}
    </span>
  );
};

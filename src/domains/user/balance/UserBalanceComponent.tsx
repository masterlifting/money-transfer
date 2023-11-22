/** @format */

import { useEffect } from 'react';
import { IAuthUserGet } from '../../auth/AuthTypes';
import { useUserBalance } from './UserBalanceHooks';

interface IUserBalanceProps {
  user: IAuthUserGet;
}

export const UserBalance = ({ user }: IUserBalanceProps) => {
  const { userBalance, updateUserBalance } = useUserBalance();

  useEffect(() => {
    updateUserBalance(user);
  }, [user]);

  return (
    <span className='text-yellow-400 font-bold'>
      {userBalance.symbol}
      {userBalance.value}
    </span>
  );
};

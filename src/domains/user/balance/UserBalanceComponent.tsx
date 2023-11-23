/** @format */

import { useEffect } from 'react';
import { IAuthUserGet } from '../../auth/AuthTypes';
import { useUserBalanceContext } from './UserBalanceHooks';

interface IUserBalanceProps {
  user: IAuthUserGet;
}

export const UserBalance = ({ user }: IUserBalanceProps) => {
  const { userBalance, updateUserBalance } = useUserBalanceContext();

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

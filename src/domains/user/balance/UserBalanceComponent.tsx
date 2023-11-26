/** @format */

import { IAuthUserGet } from '../../auth/AuthTypes';
import { useUserBalanceContext } from './UserBalanceHooks';

interface IUserBalanceProps {
  user: IAuthUserGet;
}

export const UserBalance = ({ user }: IUserBalanceProps) => {
  const { userBalance } = useUserBalanceContext();
  return (
    <span className='text-yellow-400 font-bold'>
      {userBalance?.amount.symbol}
      {userBalance?.amount.value}
    </span>
  );
};

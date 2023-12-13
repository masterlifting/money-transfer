/** @format */

import React from 'react';
import { useUserBalanceContext } from '../userBalanceHooks';

export const UserBalance = () => {
  const { userBalance } = useUserBalanceContext();
  return (
    <span className='text-yellow-400 font-bold'>
      {userBalance?.amount.symbol}
      {userBalance?.amount.value}
    </span>
  );
};

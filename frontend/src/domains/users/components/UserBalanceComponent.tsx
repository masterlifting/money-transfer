/** @format */

import React from 'react';
import { useAppSelector } from '../../../shared/hooks/useAppSelector';

export const UserBalance = () => {
  const { userBalance } = useAppSelector(state => state.usersState);
  return (
    <span className='text-yellow-400 font-bold'>
      {userBalance?.amount.symbol}
      {userBalance?.amount.value}
    </span>
  );
};

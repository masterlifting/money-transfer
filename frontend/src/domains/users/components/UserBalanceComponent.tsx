/** @format */

import React, { useEffect } from 'react';
import { useAppSelector } from '../../../shared/hooks/useAppSelector';
import { useLazyGetUserBalanceQuery } from '../usersApi';
import { useAppActions } from '../../../shared/hooks/useAppActions';
import { TextColor } from '../../../shared/styles/colors';

export const UserBalance = () => {
  const { authUser } = useAppSelector(x => x.authState);
  const { userBalance } = useAppSelector(x => x.usersState);

  const { setUserBalance } = useAppActions();

  const [getBalance, { data: apiResult }] = useLazyGetUserBalanceQuery();

  useEffect(() => {
    if (authUser && !apiResult) {
      getBalance(authUser.id);
    }
    if (apiResult && apiResult.isSuccess) {
      setUserBalance(apiResult.data);
    }
  }, [apiResult, authUser, getBalance, setUserBalance]);

  return (
    <span className={`${TextColor.Warning} font-bold`}>
      {userBalance?.amount.symbol}
      {userBalance?.amount.value}
    </span>
  );
};

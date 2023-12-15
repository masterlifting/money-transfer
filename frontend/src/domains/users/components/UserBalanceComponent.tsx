/** @format */

import React, { useEffect } from 'react';
import { useAppSelector } from '../../../shared/hooks/useAppSelector';
import { useLazyGetUserBalanceQuery } from '../usersApi';
import { useAppActions } from '../../../shared/hooks/useAppActions';
import { TextColor } from '../../../shared/styles/colors';
import { useValidateApiResult } from '../../../shared/hooks/useValidateApiResult';
import { Error } from '../../../shared/components/errors/ErrorComponent';

export const UserBalance = () => {
  const { authUser } = useAppSelector(x => x.authState);
  const { userBalance } = useAppSelector(x => x.usersState);
  const { totalCount } = useAppSelector(x => x.transactionsState);

  const { setUserBalanceState } = useAppActions();

  const [getBalance, { data, error }] = useLazyGetUserBalanceQuery();

  const validationResult = useValidateApiResult(data, error, setUserBalanceState);

  useEffect(() => {
    if (authUser) {
      getBalance(authUser.id);
    }
  }, [authUser, getBalance, totalCount]);

  return !validationResult.isValid ? (
    <Error error={validationResult} />
  ) : (
    <span className={`${TextColor.Warning} font-bold`}>
      {userBalance?.amount.symbol}
      {userBalance?.amount.value}
    </span>
  );
};

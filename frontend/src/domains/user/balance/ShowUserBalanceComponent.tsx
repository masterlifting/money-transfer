/** @format */

import React, { useEffect } from 'react';
import { useAppSelector } from '../../../shared/hooks/useAppSelector';
import { useAppActions } from '../../../shared/hooks/useAppActions';
import { TextColor } from '../../../shared/styles/colors';
import { useValidateApiResult } from '../../../shared/hooks/useValidateApiResult';
import { Error } from '../../../shared/components/errors/ErrorComponent';
import { useLazyGetBalanceQuery } from '../usersApi';

export const ShowUserBalance = () => {
  const { user } = useAppSelector(x => x.authState);
  const { balance, transactionsTotalCount } = useAppSelector(x => x.usersState);

  const { setUserBalanceState } = useAppActions();

  const [getBalance, { data, error }] = useLazyGetBalanceQuery();

  const validationResult = useValidateApiResult(data, error, setUserBalanceState);

  useEffect(() => {
    if (user) {
      getBalance(user.id);
    }
  }, [user, getBalance, transactionsTotalCount]);

  return !validationResult.isValid ? (
    <Error error={validationResult} />
  ) : (
    <span className={`${TextColor.Warning} font-bold`}>
      {balance?.amount.symbol}
      {balance?.amount.value}
    </span>
  );
};
/** @format */

import React, { useEffect } from 'react';
import { Error } from '../../../../components/errors/ErrorComponent';
import { useAppActions } from '../../../../hooks/useAppActions';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useValidateApiResult } from '../../../../hooks/useValidateApiResult';
import { TextColor } from '../../../../styles/colors';
import { useLazyGetUserBalanceQuery } from '../userBalanceApi';

export const ShowUserBalance = () => {
  const { user } = useAppSelector(x => x.authState);
  const { userTransactionsTotalCount } = useAppSelector(x => x.userTransactionsState);
  const { userBalance } = useAppSelector(x => x.userBalanceState);
  const { setUserBalanceState } = useAppActions();

  const [getUserBalance, { data, error }] = useLazyGetUserBalanceQuery();

  const validationResult = useValidateApiResult(data, error, setUserBalanceState);

  useEffect(() => {
    if (user) {
      getUserBalance({ user });
    }
  }, [user, getUserBalance, userTransactionsTotalCount]);

  return !validationResult.isValid ? (
    <Error error={validationResult} />
  ) : (
    <span className={`${TextColor.Warning} font-bold`}>
      {userBalance.amount.value}
      {userBalance.amount.symbol}
    </span>
  );
};

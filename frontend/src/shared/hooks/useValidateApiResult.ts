/** @format */

import { ValidationResultType, WebApiResponseType } from '../../../../shared/types';
import { useEffect, useState } from 'react';
import { useAppActions } from './useAppActions';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { constants } from '../constants';

export const useValidateApiResult = <T>(
  apiResult: WebApiResponseType<T> | undefined,
  apiError: FetchBaseQueryError | SerializedError | undefined,
  setStateCallback?: (state: T) => void,
) => {
  const { clearAuthState } = useAppActions();
  const [validationResult, setValidationResult] = useState<ValidationResultType>({ isValid: false, errors: [] });
  useEffect(() => {
    if (apiResult) {
      if (apiResult.isSuccess) {
        setValidationResult({ isValid: true });
        setStateCallback && setStateCallback(apiResult.data);
      } else {
        setValidationResult({ isValid: false, errors: [{ message: apiResult.error.message }] });
      }
    } else if (apiError) {
      if ('status' in apiError) {
        apiError.status === 401 && clearAuthState();

        if ('error' in apiError) {
          setValidationResult({ isValid: false, errors: [{ message: apiError.error }] });
        } else {
          setValidationResult({ isValid: false, errors: [{ message: constants.http.defaultErrorMessage }] });
        }
      } else {
        setValidationResult({ isValid: false, errors: [{ message: apiError.message || '' }] });
      }
    } else {
      setValidationResult({ isValid: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiError, apiResult]);

  return validationResult;
};

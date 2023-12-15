/** @format */

import { useEffect, useState } from 'react';
import { ValidationResultType } from '../../../../shared/types/errorTypes';
import { WebApiResponseType } from '../../../../shared/types/webApiTypes';
import { useAppActions } from './useAppActions';

export const useValidateApiResult = <T>(
  apiResult: WebApiResponseType<T> | undefined,
  apiError: any,
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
      setValidationResult({ isValid: false, errors: [{ message: apiError?.toString() || '' }] });

      apiError?.status === 401 && clearAuthState();
    } else {
      setValidationResult({ isValid: true });
    }
  }, [apiError, apiResult, clearAuthState]);

  return validationResult;
};

/** @format */

import { useEffect, useState } from 'react';
import { AuthType, IAuthUserPost } from '../../../../shared/types/authTypes';
import { useNavigate } from 'react-router-dom';
import { ValidationResultType } from '../../../../shared/types/errorTypes';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import { useAppActions } from '../../shared/hooks/useAppActions';
import { useLoginUserMutation, useRegisterUserMutation } from './authApi';

export const useAuthorize = () => {
  const navigate = useNavigate();
  const { authUser } = useAppSelector(x => x.authState);

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
    }
  }, [authUser, navigate]);

  return { authUser: authUser! };
};

export const useAuth = (authType: AuthType) => {
  const navigate = useNavigate();
  const { setAuthState } = useAppActions();

  const [user, setUser] = useState<IAuthUserPost>({ email: '', password: '' });
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const { submitUser, authUser, validationResult, isLoading } = useSubmitUser(authType, user, confirmedPassword);

  useEffect(() => {
    if (authUser) {
      navigate('/');
      setAuthState(authUser);
    }
  }, [authUser, navigate, setAuthState]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validationResult.isValid && submitUser(user);
  };

  return {
    user,
    isLoading,
    validationResult,
    confirmedPassword,
    onSubmit,
    onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, email: e.target.value }),
    onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, password: e.target.value }),
    onChangeConfirmedPassword: (e: React.ChangeEvent<HTMLInputElement>) => setConfirmedPassword(e.target.value),
  };
};

const getUserValidationError = (authType: AuthType, user: IAuthUserPost, confirmedPassword?: string): string | undefined => {
  const { email, password } = user;

  if (email.length === 0) {
    return 'Email is required';
  }

  if (!email.includes('@') || !email.includes('.') || email.length < 8) {
    return 'Email is not valid';
  }

  if (password.length === 0) {
    return 'Password is required';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }

  if (authType === 'Register' && confirmedPassword && password !== confirmedPassword) {
    return 'Passwords do not match';
  }

  return undefined;
};

const useSubmitUser = (authType: AuthType, user: IAuthUserPost, confirmedPassword?: string) => {
  const useUserMutation = authType === 'Login' ? useLoginUserMutation : useRegisterUserMutation;
  const [submitUser, { isError: apiHasError, isLoading, data: apiResult, error: apiError }] = useUserMutation();
  const [validationResult, setValidationResult] = useState<ValidationResultType>({ isValid: true });

  useEffect(() => {
    const userValidationError = getUserValidationError(authType, user, confirmedPassword);

    if (userValidationError) {
      setValidationResult({
        isValid: false,
        errors: [{ message: userValidationError }],
      });
    } else if (apiResult) {
      if (apiResult.isSuccess) {
        setValidationResult({ isValid: true });
      } else {
        setValidationResult({ isValid: false, errors: [{ message: apiResult.error.message }] });
      }
    } else if (apiHasError) {
      setValidationResult({ isValid: false, errors: [{ message: apiError?.toString() || '' }] });
    } else {
      setValidationResult({ isValid: true });
    }
  }, [apiResult, authType, confirmedPassword, apiError, apiHasError, user]);

  return { submitUser, authUser: apiResult?.isSuccess ? apiResult.data : undefined, validationResult, isLoading };
};

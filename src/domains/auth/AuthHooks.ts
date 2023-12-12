/** @format */

import { useEffect, useState } from 'react';
import { AuthType, IAuthUserPost } from './AuthTypes';
import { useNavigate } from 'react-router-dom';
import { ValidationResultType } from '../../shared/components/errors/ErrorTypes';
import { useAppSelector } from '../../shared/hooks/ReduxAppSelector';
import { useAppActions } from '../../shared/hooks/ReduxAppActions';
import { useLoginUserMutation, useRegisterUserMutation } from './AuthApi';

export const useAuth = (authType: AuthType) => {
  const navigate = useNavigate();
  const { authUser } = useAppSelector(x => x.authState);

  useEffect(() => authUser && navigate('/'), [authUser, navigate]);

  const [user, setUser] = useState<IAuthUserPost>({ email: '', password: '' });
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const { submitUser, validationResult, isLoading } = useSubmitUser(authType, user, confirmedPassword);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    return validationResult.isValid && submitUser(user);
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

const validateUser = (authType: AuthType, user: IAuthUserPost, confirmedPassword?: string): string | undefined => {
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
  const [submitUser, { isError, isLoading, data: apiResult, error }] = useUserMutation();
  const { setAuthState } = useAppActions();
  const [validationResult, setValidationResult] = useState<ValidationResultType>({ isValid: true });

  useEffect(() => {
    const validationError = validateUser(authType, user, confirmedPassword);

    if (validationError) {
      return setValidationResult({
        isValid: false,
        errors: [{ message: validationError }],
      });
    }

    if (apiResult) {
      if (apiResult.isSuccess) {
        setValidationResult({ isValid: true });
        setAuthState({ authUser: apiResult.data });
      } else {
        setValidationResult({ isValid: false, errors: [{ message: apiResult.error.message }] });
        setAuthState({ authUser: undefined });
      }
    } else if (isError) {
      alert(error?.toString() || '');
      setAuthState({ authUser: undefined });
    } else {
      setValidationResult({ isValid: true });
    }
  }, [apiResult, authType, confirmedPassword, error, isError, setAuthState, user]);

  return { submitUser, validationResult, isLoading };
};

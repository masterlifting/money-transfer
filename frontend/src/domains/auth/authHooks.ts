/** @format */

import { useEffect, useState } from 'react';
import { AuthType, IAuthUserPost } from '../../../../shared/types/authTypes';
import { useNavigate } from 'react-router-dom';
import { ValidationResultType } from '../../../../shared/types/errorTypes';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import { useAppActions } from '../../shared/hooks/useAppActions';
import { useLoginUserMutation, useRegisterUserMutation } from './authApi';
import { useValidateApiResult } from '../../shared/hooks/useValidateApiResult';

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
  const [user, setUser] = useState<IAuthUserPost>({ email: '', password: '' });
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const { isLoading, submitUser, validationResult } = useSubmitUser(authType, user, confirmedPassword);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validationResult.isValid && submitUser(user);
  };

  return {
    isLoading,
    validationResult,

    user,
    confirmedPassword,

    onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, email: e.target.value }),
    onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, password: e.target.value }),
    onChangeConfirmedPassword: (e: React.ChangeEvent<HTMLInputElement>) => setConfirmedPassword(e.target.value),

    onSubmit,
  };
};

const useSubmitUser = (authType: AuthType, user: IAuthUserPost, confirmedPassword?: string) => {
  const useUserSubmitMutation = authType === 'Login' ? useLoginUserMutation : useRegisterUserMutation;

  const navigate = useNavigate();
  const { setAuthState } = useAppActions();

  const [submitUser, { isLoading, data, error }] = useUserSubmitMutation();
  const submitValidationResulrt = useValidateApiResult(data, error, autUser => {
    setAuthState(autUser);
    navigate('/');
  });

  const [validationResult, setValidationResult] = useState<ValidationResultType>({ isValid: true });

  // Validate user on submit
  useEffect(() => {
    if (submitValidationResulrt) {
      return setValidationResult(submitValidationResulrt);
    }

    const userValidationResult = getUserValidationResult(authType, user, confirmedPassword);

    if (!userValidationResult.isValid) {
      return setValidationResult(userValidationResult);
    }

    return setValidationResult({ isValid: true });
  }, [authType, confirmedPassword, submitValidationResulrt, user]);

  return { isLoading, submitUser, validationResult };
};

const getUserValidationResult = (authType: AuthType, user: IAuthUserPost, confirmedPassword?: string): ValidationResultType => {
  const { email, password } = user;

  if (email.length === 0) {
    return { isValid: false, errors: [{ message: 'Email is required' }] };
  }

  if (!email.includes('@') || !email.includes('.') || email.length < 8) {
    return { isValid: false, errors: [{ message: 'Email is not valid' }] };
  }

  if (password.length === 0) {
    return { isValid: false, errors: [{ message: 'Password is required' }] };
  }

  if (password.length < 6) {
    return { isValid: false, errors: [{ message: 'Password must be at least 6 characters long' }] };
  }

  if (authType === 'Register' && confirmedPassword && password !== confirmedPassword) {
    return { isValid: false, errors: [{ message: 'Passwords do not match' }] };
  }

  return { isValid: true };
};

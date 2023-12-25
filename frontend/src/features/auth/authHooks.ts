/** @format */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAuthRequest } from '../../../../shared/interfacesDto';
import { AuthType, ValidationResultType } from '../../../../shared/types';
import { useAppActions } from '../../hooks/useAppActions';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useValidateApiResult } from '../../hooks/useValidateApiResult';
import { useLoginUserMutation, useRegisterUserMutation } from './authApi';

export const useAuthorize = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(x => x.authState);
  const { setUserEmailState } = useAppActions();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setUserEmailState(user.email);
    }
  }, [user, navigate, setUserEmailState]);

  return { user };
};

export const useAuth = (authType: AuthType) => {
  const [user, setUser] = useState<IAuthRequest>({ email: '', password: '' });
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const { isLoading, submitUser, validationResult, resetValidationResult } = useSubmitUser(authType, user, confirmedPassword);

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    resetValidationResult();
    return setUser({ ...user, email: event.target.value });
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    resetValidationResult();
    return setUser({ ...user, password: event.target.value });
  };

  const onChangeConfirmedPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    resetValidationResult();
    return setConfirmedPassword(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validationResult.isValid && submitUser(user);
  };

  return {
    isLoading,
    validationResult,

    user,
    confirmedPassword,

    onChangeEmail,
    onChangePassword,
    onChangeConfirmedPassword,

    onSubmit,
  };
};

const useSubmitUser = (authType: AuthType, user: IAuthRequest, confirmedPassword?: string) => {
  const useUserSubmitMutation = authType === 'Login' ? useLoginUserMutation : useRegisterUserMutation;

  const navigate = useNavigate();
  const { setAuthState, setUserEmailState } = useAppActions();

  const [submitUser, { isLoading, data, error, reset: resetValidationResult }] = useUserSubmitMutation();
  const submitValidationResulrt = useValidateApiResult(data, error, autUser => {
    setAuthState(autUser);
    setUserEmailState(autUser.user.email);
    navigate('/');
  });

  const [validationResult, setValidationResult] = useState<ValidationResultType>({ isValid: true });

  // Validate user on submit
  useEffect(() => {
    if (!submitValidationResulrt.isValid) {
      return setValidationResult(submitValidationResulrt);
    }

    const userValidationResult = getUserValidationResult(authType, user, confirmedPassword);

    if (!userValidationResult.isValid) {
      return setValidationResult(userValidationResult);
    }

    return setValidationResult({ isValid: true });
  }, [authType, confirmedPassword, submitValidationResulrt, user]);

  return { isLoading, submitUser, validationResult, resetValidationResult };
};

const getUserValidationResult = (authType: AuthType, user: IAuthRequest, confirmedPassword?: string): ValidationResultType => {
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

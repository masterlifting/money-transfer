/** @format */

import { useEffect, useState } from 'react';
import { AuthType, IAuthUserPost } from './AuthTypes';
import { useNavigate } from 'react-router-dom';
import { IError, ValidationResultType } from '../../shared/components/errors/ErrorTypes';
import { useAppSelector } from '../../shared/hooks/ReduxAppSelector';
import { useAppActions } from '../../shared/hooks/ReduxAppActions';
import { useLoginUserMutation, useRegisterUserMutation } from './AuthApi';

export const useAuth = (authType: AuthType) => {
  const navigate = useNavigate();

  const { authUser } = useAppSelector(x => x.authState);

  const [user, setUser] = useState<IAuthUserPost>({ email: '', password: '' });
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const { loginUser, errors: loginErrors, isLoading: isLoginLoading } = useLoginUser(authType, user);
  const {
    registerUser,
    errors: registerErrors,
    isLoading: isRegisterLoading,
  } = useRegisterUser(authType, user, confirmedPassword);

  const validationResult: ValidationResultType =
    authType === 'Login'
      ? loginErrors.length === 0
        ? { isValid: true }
        : { isValid: false, errors: loginErrors }
      : registerErrors.length === 0
      ? { isValid: true }
      : { isValid: false, errors: registerErrors };

  const isLoading = isLoginLoading || isRegisterLoading;

  console.log('useAuth');

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  //Submit auth user
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validationResult.isValid) {
      if (authType === 'Login') {
        loginUser(user);
      } else if (authType === 'Register') {
        registerUser(user);
      }
    }
  };

  return {
    user,
    isLoading,
    confirmedPassword,
    validationResult,
    onSubmit: onSubmit,
    onChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, email: event.target.value }),
    onChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, password: event.target.value }),
    onChangeConfirmedPassword: (event: React.ChangeEvent<HTMLInputElement>) => setConfirmedPassword(event.target.value),
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

const useLoginUser = (authType: AuthType, user: IAuthUserPost) => {
  const [loginUser, { isError, isLoading, data: apiResult, error }] = useLoginUserMutation();
  const { setAuthState } = useAppActions();
  const [errors, setErrors] = useState<IError[]>([]);

  useEffect(() => {
    if (authType !== 'Login') {
      console.log(authType);
      return;
    }

    const validationErrors = validateUser(authType, user);

    if (validationErrors.length > 0) {
      setErrors(validationErrors.map(error => ({ message: error })));
      return;
    }

    if (apiResult) {
      if (apiResult.isSuccess) {
        setAuthState({ authUser: apiResult.data });
      } else {
        setAuthState({ authUser: undefined });
        setErrors([{ message: apiResult.error.message }]);
      }
    } else {
      if (isError) {
        setAuthState({ authUser: undefined });
        setErrors([{ message: error?.toString() || '' }]);
      }
    }
  }, [apiResult, isError, error, user, setAuthState, authType]);

  return { errors, isLoading, loginUser };
};

const useRegisterUser = (authType: AuthType, user: IAuthUserPost, confirmedPassword: string) => {
  const [registerUser, { isError, isLoading, data: apiResult, error }] = useRegisterUserMutation();
  const { setAuthState } = useAppActions();
  const [errors, setErrors] = useState<IError[]>([]);

  useEffect(() => {
    if (authType !== 'Register') {
      console.log(authType);
      return;
    }

    const validationErrors = validateUser(authType, user, confirmedPassword);

    if (validationErrors.length > 0) {
      setErrors(validationErrors.map(error => ({ message: error })));
      return;
    }

    if (apiResult) {
      if (apiResult.isSuccess) {
        setAuthState({ authUser: apiResult.data });
      } else {
        setAuthState({ authUser: undefined });
        setErrors([{ message: apiResult.error.message }]);
      }
    } else {
      if (isError) {
        setAuthState({ authUser: undefined });
        setErrors([{ message: error?.toString() || '' }]);
      }
    }
  }, [apiResult, isError, error, user, confirmedPassword, setAuthState, authType]);

  return { errors, isLoading, registerUser };
};

const validateUser = (authType: AuthType, user: IAuthUserPost, confirmedPassword?: string) => {
  const errors: string[] = [];

  if (!user.email || user.email.length === 0) {
    errors.push('Email is required');
  }

  if (user.email && !user.email.includes('@') && !user.email.includes('.') && user.email.length < 8) {
    errors.push('Email is not valid');
  }

  if (!user.password || user.password.length === 0) {
    errors.push('Password is required');
  }

  if (user.password && user.password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (authType === 'Register' && confirmedPassword && user.password !== confirmedPassword) {
    errors.push('Passwords do not match');
  }

  return errors;
};

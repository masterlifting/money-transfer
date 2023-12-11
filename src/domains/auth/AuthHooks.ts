/** @format */

import { AuthContext } from './AuthContext';
import { useContext, useEffect, useState } from 'react';
import { AuthType, IAuthUserPost } from './AuthTypes';
import { useNavigate } from 'react-router-dom';
import { ValidationResultType } from '../../shared/components/errors/ErrorTypes';
import { useAppSelector } from '../../shared/hooks/ReduxAppSelector';
import { useAppActions } from '../../shared/hooks/ReduxAppActions';
import { useLoginMutation, useRegisterMutation } from './AuthApi';

/** @format */

export const useAuth = (authType: AuthType) => {
  const navigate = useNavigate();
  //const { authLoading, authUser, authErrors, setAuthState } = useAuthContext();

  const [login, { isError: isLoginError, isLoading, isSuccess, data, error }] = useLoginMutation();
  const [register] = useRegisterMutation();

  const { setAuthState } = useAppActions();
  const { authUser } = useAppSelector(x => x.authState);

  const [user, setUser] = useState<IAuthUserPost>({ email: '', password: '' });
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [validationResult, setValidationResult] = useState<ValidationResultType>({ isValid: false, errors: [] });

  //Validate auth user
  const getAuthUserValidationErrors = (authUser: IAuthUserPost, confirmedPassword: string, authType: AuthType) => {
    const errors: string[] = [];

    if (!authUser.email || authUser.email.length === 0) {
      errors.push('Email is required');
    }

    if (authUser.email && !authUser.email.includes('@') && !authUser.email.includes('.') && authUser.email.length < 8) {
      errors.push('Email is not valid');
    }

    if (!authUser.password || authUser.password.length === 0) {
      errors.push('Password is required');
    }

    if (authUser.password && authUser.password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }

    if (authType === 'Register' && authUser.password !== confirmedPassword) {
      errors.push('Passwords do not match');
    }

    return errors;
  };
  useEffect(() => {
    const validationErrors = getAuthUserValidationErrors(user, confirmedPassword, authType);

    if (validationErrors.length === 0) {
      setValidationResult({ isValid: true });
    } else {
      setValidationResult({ isValid: false, errors: validationErrors.map(error => ({ message: error })) });
    }
  }, [authType, user, confirmedPassword]);

  //Submit auth user
  useEffect(() => {
    if (authUser) {
      navigate('/');
    } else {
      setValidationResult({ isValid: false, errors: authErrors });
    }
  }, [authErrors, authUser, navigate]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validationResult.isValid) {
      return;
    }

    if (authType === 'Login') {
      login(user);
    } else if (authType === 'Register') {
      register(user);
    }

    setAuthState({ authUser });
  };

  return {
    authLoading,
    authUser: user,
    authUserConfirmedPassword: confirmedPassword,
    authUserValidationResult: validationResult,
    onSubmitAuthUser: onSubmit,
    onChangeAuthUserEmail: (event: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, email: event.target.value }),
    onChangeAuthUserPassword: (event: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, password: event.target.value }),
    onChangeAuthUserConfirmedPassword: (event: React.ChangeEvent<HTMLInputElement>) => setConfirmedPassword(event.target.value),
  };
};

export const useAuthRedirection = () => {
  const navigate = useNavigate();
  const { authUser } = useAppSelector(state => state.authState);

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
    }
  }, [authUser, navigate]);

  return { authUser: authUser! };
};

export const useAuthContext = () => useContext(AuthContext);

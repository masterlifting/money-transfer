/** @format */

import { AuthContext } from './AuthContext';
import { useContext, useEffect, useState } from 'react';
import { AuthType, IAuthUserPost } from './AuthTypes';
import { useNavigate } from 'react-router-dom';
import { ValidationResultType } from '../../shared/components/errors/ErrorTypes';

/** @format */

export const useAuth = (authType: AuthType) => {
  const navigate = useNavigate();
  const { authUser, authErrors, setAuthState } = useAuthContext();

  const [userPost, setUserPost] = useState<IAuthUserPost>({ email: '', password: '' });
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
    const validationErrors = getAuthUserValidationErrors(userPost, confirmedPassword, authType);

    if (validationErrors.length === 0) {
      setValidationResult({ isValid: true });
    } else {
      setValidationResult({ isValid: false, errors: validationErrors.map(error => ({ message: error })) });
    }
  }, [authType, userPost, confirmedPassword]);

  //Submit auth user
  useEffect(() => {
    if (authUser) {
      navigate('/');
    } else {
      setValidationResult({ isValid: false, errors: authErrors });
    }
  }, [authErrors, authUser, navigate]);
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validationResult.isValid) {
      return;
    }

    setAuthState(authType, userPost);
  };

  return {
    authUser: userPost,
    authUserConfirmedPassword: confirmedPassword,
    authUserValidationResult: validationResult,
    onSubmitAuthUser: onSubmit,
    onChangeAuthUserEmail: (event: React.ChangeEvent<HTMLInputElement>) =>
      setUserPost({ ...userPost, email: event.target.value }),
    onChangeAuthUserPassword: (event: React.ChangeEvent<HTMLInputElement>) =>
      setUserPost({ ...userPost, password: event.target.value }),
    onChangeAuthUserConfirmedPassword: (event: React.ChangeEvent<HTMLInputElement>) => setConfirmedPassword(event.target.value),
  };
};

export const useAuthRedirection = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
    }
  }, [authUser, navigate]);

  return { authUser: authUser! };
};

export const useAuthContext = () => useContext(AuthContext);

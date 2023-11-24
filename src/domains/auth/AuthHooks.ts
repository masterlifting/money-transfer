/** @format */

import { AuthContext } from './AuthContext';
import { useContext, useEffect, useState } from 'react';
import { IAuthType, IAuthUserPost } from './AuthTypes';
import { authorizeUser, registerUser } from './AuthData';
import { useNavigate } from 'react-router-dom';
import { ValidationResult } from '../../shared/components/errors/ErrorTypes';

/** @format */

export const useAuthRedirection = () => {
  const navigate = useNavigate();
  const { isAuthorized, authUser } = useAuthContext();

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/login');
    }
  }, [isAuthorized, navigate]);

  const user = authUser!;

  return { authUser: user };
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const useAuth = (authType: IAuthType) => {
  const navigate = useNavigate();
  const { setAuthState } = useAuthContext();

  const [validationResult, setValidationResult] = useState<ValidationResult>({ isValid: false, errors: [] });
  const [authUser, setAuthUser] = useState<IAuthUserPost>({ email: '', password: '' });
  const [confirmedPassword, setConfirmedPassword] = useState('');

  useEffect(() => {
    setValidationResult({ isValid: true });

    const errors: string[] = [];
    if (!authUser.email || authUser.email.length === 0) {
      errors.push('Email is required');
    }

    if (!authUser.password || authUser.password.length === 0) {
      errors.push('Password is required');
    }

    if (authType === 'Register' && authUser.password !== confirmedPassword) {
      errors.push('Passwords do not match');
    }

    if (errors.length > 0) {
      setValidationResult({ isValid: false, errors: errors.map(error => ({ message: error })) });
    }
  }, [authType, authUser.email, authUser.password, confirmedPassword]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validationResult.isValid) {
      return;
    }

    const authUserResponse = authType === 'Register' ? await registerUser(authUser) : await authorizeUser(authUser);

    if (authUserResponse.isSuccess) {
      setAuthState(authUserResponse.data);
      navigate('/');
    } else {
      setValidationResult({ isValid: false, errors: [{ message: authUserResponse.error.message }] });
    }
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAuthUser({ ...authUser, email: value });
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAuthUser({ ...authUser, password: value });
  };

  const onChangeConfirmedPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmedPassword(event.target.value);
  };

  return {
    authUser,
    authUserConfirmedPassword: confirmedPassword,
    authUserValidationResult: validationResult,
    onSubmitAuthUser: onSubmit,
    onChangeAuthUserEmail: onChangeEmail,
    onChangeAuthUserPassword: onChangePassword,
    onChangeAuthUserConfirmedPassword: onChangeConfirmedPassword,
  };
};

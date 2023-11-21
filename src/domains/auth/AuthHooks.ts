/** @format */

import { IValidation } from '../../shared/types/ValidationTypes';
import { AuthContext } from './AuthContext';
import { useContext, useEffect, useState } from 'react';
import { IAuthUserPost } from './AuthTypes';
import { authorizeUser } from './AuthData';
import { useNavigate } from 'react-router-dom';

/** @format */

export const useAuthRedirection = () => {
  const navigate = useNavigate();
  const { isAuthorized } = useAuthState();

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/login');
    }
  }, [isAuthorized, navigate]);

  return { isAuthorized };
};

export const useAuthState = () => {
  return useContext(AuthContext);
};

export const useAuthorizeUser = () => {
  const navigate = useNavigate();
  const { setAuthState } = useAuthState();

  const [validation, setValidation] = useState<IValidation>({ message: '', isValid: true });
  const [authUserPostModel, setAuthUserPostModel] = useState<IAuthUserPost>({ email: '', password: '' });

  useEffect(() => {
    setValidation({ message: '', isValid: true });

    if (!authUserPostModel.email || authUserPostModel.email.length === 0) {
      setValidation({ message: 'Email is required', isValid: false });
    }

    if (!authUserPostModel.password || authUserPostModel.password.length === 0) {
      setValidation({ message: 'Password is required', isValid: false });
    }
  }, [authUserPostModel.email, authUserPostModel.password]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validation.isValid) {
      return;
    }

    const authorizedUserResponse = await authorizeUser(authUserPostModel);

    if (authorizedUserResponse.isSuccess) {
      setAuthState(authorizedUserResponse.data);
      navigate('/');
    } else {
      setValidation({ message: authorizedUserResponse.error.message, isValid: false });
    }
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAuthUserPostModel({ ...authUserPostModel, email: value });
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAuthUserPostModel({ ...authUserPostModel, password: value });
  };

  return {
    validation,
    authUserPostModel,
    onSubmit,
    onChangeEmail,
    onChangePassword,
    setValidation,
  };
};

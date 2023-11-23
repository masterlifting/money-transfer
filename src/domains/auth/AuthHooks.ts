/** @format */

import { IValidation } from '../../shared/types/ValidationTypes';
import { AuthContext } from './AuthContext';
import { useContext, useEffect, useState } from 'react';
import { IAuthType, IAuthUserPost } from './AuthTypes';
import { authorizeUser, registerUser } from './AuthData';
import { useNavigate } from 'react-router-dom';

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

export const useAuthorizeUser = () => {
  const navigate = useNavigate();
  const { setAuthState } = useAuthContext();

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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>, type: IAuthType) => {
    event.preventDefault();

    if (!validation.isValid) {
      return;
    }

    const authUserResponse = type === 'register' ? await registerUser(authUserPostModel) : await authorizeUser(authUserPostModel);

    if (authUserResponse.isSuccess) {
      setAuthState(authUserResponse.data);
      navigate('/');
    } else {
      setValidation({ message: authUserResponse.error.message, isValid: false });
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

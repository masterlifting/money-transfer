/** @format */

import { createContext, useState } from 'react';
import { AuthType, IAuthContext, IAuthUserGet, IAuthUserPost } from './AuthTypes';
// import { loginUser, registerUser } from './AuthData';
import { IError } from '../../shared/components/errors/ErrorTypes';
import { useLazyLoginQuery } from './AuthApi';

export const AuthContext = createContext<IAuthContext>({
  authLoading: false,
  authErrors: [],
  setAuthState: (authType: AuthType, user: IAuthUserPost) => {},
  clearAuthState: () => {},
});

export const AuthStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<IAuthUserGet>();
  const [authErrors, setAuthErrors] = useState<IError[]>([]);
  const [loginUser, { isLoading: isLoginLoading, isError: isLoginError, data: loginedUser }] = useLazyLoginQuery();
  const [registerUser] = useLazyLoginQuery();

  const setAuthState = async (authType: AuthType, user: IAuthUserPost) => {
    setAuthLoading(true);

    if (authType === 'Login') {
      setAuthLoading(isLoginLoading);

      loginUser(user);

      if (isLoginError) {
        setAuthErrors([{ message: 'Login Error' }]);
      }
      if (!loginedUser!.isSuccess) {
        setAuthErrors([{ message: loginedUser!.error.message }]);
      } else {
        setAuthUser(loginedUser!.data);
      }

      setAuthLoading(false);
    } else {
      registerUser(user);
    }

    if (response.data?.isSuccess) {
      setAuthUser(response.data);
    } else {
      setAuthErrors([response.error]);
    }

    setAuthLoading(false);
  };

  const clearAuthState = () => {
    setAuthUser(undefined);
    setAuthErrors([]);
  };

  return (
    <AuthContext.Provider value={{ authLoading, authUser, authErrors, setAuthState, clearAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

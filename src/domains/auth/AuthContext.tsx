/** @format */

import { createContext, useState } from 'react';
import { AuthType, IAuthContext, IAuthUserGet, IAuthUserPost } from './AuthTypes';
import { authorizeUser, registerUser } from './AuthData';
import { IError } from '../../shared/components/errors/ErrorTypes';

export const AuthContext = createContext<IAuthContext>({
  authErrors: [],
  setAuthState: (authType: AuthType, user: IAuthUserPost) => {},
  clearAuthState: () => {},
});

export const AuthState = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<IAuthUserGet>();
  const [authErrors, setAuthErrors] = useState<IError[]>([]);

  const setAuthState = async (authType: AuthType, user: IAuthUserPost) => {
    const response = authType === 'Login' ? await authorizeUser(user) : await registerUser(user);

    if (response.isSuccess) {
      setAuthUser(response.data);
    } else {
      setAuthErrors([response.error]);
    }
  };

  const clearAuthState = () => {
    setAuthUser(undefined);
    setAuthErrors([]);
  };

  return <AuthContext.Provider value={{ authUser, authErrors, setAuthState, clearAuthState }}>{children}</AuthContext.Provider>;
};

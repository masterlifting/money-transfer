/** @format */

import { createContext, useState } from 'react';
import { AuthType, IAuthContext, IAuthUserGet, IAuthUserPost } from './AuthTypes';
import { authorizeUser, registerUser } from './AuthData';
import { IError } from '../../shared/components/errors/ErrorTypes';

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

  const setAuthState = async (authType: AuthType, user: IAuthUserPost) => {
    setAuthLoading(true);

    const response = authType === 'Login' ? await authorizeUser(user) : await registerUser(user);

    if (response.isSuccess) {
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

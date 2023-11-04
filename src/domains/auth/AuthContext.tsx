/** @format */

import { createContext, useState } from 'react';
import { IAuthUserGet } from './AuthTypes';

interface IAuthContext {
  isAuthorized: boolean;
  authUser?: IAuthUserGet;
  setAuthState: (user?: IAuthUserGet) => void;
}

export const AuthContext = createContext<IAuthContext>({
  isAuthorized: false,
  setAuthState: (user?: IAuthUserGet) => {},
});

export const AuthState = ({ children }: { children: React.ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authUser, setUser] = useState<IAuthUserGet>();

  const setAuthState = (user?: IAuthUserGet) => {
    if (user) {
      setIsAuthorized(true);
      setUser(user);
    } else {
      setIsAuthorized(false);
      setUser(undefined);
    }
  };

  return <AuthContext.Provider value={{ isAuthorized, authUser, setAuthState }}>{children}</AuthContext.Provider>;
};

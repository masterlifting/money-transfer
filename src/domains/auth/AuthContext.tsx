/** @format */

import { createContext, useState } from 'react';
import { IUserGet } from './AuthInterfaces';

interface IAuthContext {
  isAuthorised: boolean;
  user?: IUserGet;
  setState: (user?: IUserGet) => void;
}

export const AuthContext = createContext<IAuthContext>({
  isAuthorised: false,
  setState: (user?: IUserGet) => {},
});

export const AuthState = ({ children }: { children: React.ReactNode }) => {
  const [isAuthorised, setIsAuthorized] = useState(false);
  const [user, setUser] = useState<IUserGet>();

  const setState = (user?: IUserGet) => {
    if (user) {
      setIsAuthorized(true);
      setUser(user);
    } else {
      setIsAuthorized(false);
      setUser(undefined);
    }
  };

  return <AuthContext.Provider value={{ isAuthorised, user, setState }}>{children}</AuthContext.Provider>;
};

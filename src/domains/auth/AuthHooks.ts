/** @format */

import { AuthContext } from './AuthContext';
import { useContext } from 'react';

/** @format */
export const useAuthState = () => {
  return useContext(AuthContext);
};

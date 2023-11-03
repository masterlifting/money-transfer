/** @format */

import { CustomModalContext } from './CustomModalContext';
import { useContext } from 'react';

export const useCustomModal = () => {
  return useContext(CustomModalContext);
};

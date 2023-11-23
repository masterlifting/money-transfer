/** @format */

import { ModalContext } from './ModalContext';
import { useContext } from 'react';

export const useModalContext = () => {
  return useContext(ModalContext);
};

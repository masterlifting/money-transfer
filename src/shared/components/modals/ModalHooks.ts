/** @format */

import { ModalContext } from './ModalContext';
import { useContext } from 'react';

export const useModalState = () => {
  return useContext(ModalContext);
};

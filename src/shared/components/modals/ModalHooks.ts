/** @format */

import { ModalContext } from './ModalContext';
import { useContext } from 'react';

export const useModal = () => {
  return useContext(ModalContext);
};

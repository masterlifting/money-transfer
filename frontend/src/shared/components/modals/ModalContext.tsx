/** @format */

import { createContext, useState } from 'react';
import { IModalContext } from './modalTypes';

export const ModalContext = createContext<IModalContext>({
  modalId: '',
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const ModalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState({ id: '', isOpen: false });

  const openModal = (id: string) => {
    setModal({ id: id, isOpen: true });
  };
  const closeModal = () => setModal({ id: '', isOpen: false });

  return (
    <ModalContext.Provider value={{ modalId: modal.id, isModalOpen: modal.isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

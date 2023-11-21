/** @format */

import { createContext, useState } from 'react';

interface IModalContext {
  modalId: string;
  isModalOpen: boolean;
  openModal: (key: string) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<IModalContext>({
  modalId: '',
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const CustomModalState = ({ children }: { children: React.ReactNode }) => {
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

/** @format */

import { createContext, useState } from 'react';

interface ICustomModalContext {
  currentModalKey: string;
  isModalOpen: boolean;
  openModal: (key: string) => void;
  closeModal: () => void;
}

export const CustomModalContext = createContext<ICustomModalContext>({
  currentModalKey: '',
  isModalOpen: false,
  openModal: (key: string) => {},
  closeModal: () => {},
});

export const CustomModalState = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalKey, setModalKey] = useState<string>('');

  const openModal = (key: string) => {
    setIsModalOpen(true);
    setModalKey(key);
  };
  const closeModal = () => setIsModalOpen(false);

  return <CustomModalContext.Provider value={{ currentModalKey, isModalOpen, openModal, closeModal }}>{children}</CustomModalContext.Provider>;
};

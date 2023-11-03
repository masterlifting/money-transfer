/** @format */

import { createContext, useState } from 'react';
import { IUser } from './AuthInterfaces';

interface IAuthContext {
  isAuthorised: boolean;
  user?: IUser;
}

export const CustomModalContext = createContext<ICustomModalContext>({
  currentModalTitle: '',
  isModalOpen: false,
  openModal: (key: string) => {},
  closeModal: () => {},
});

export const CustomModalState = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalTitle, setCurrentModalTitle] = useState<string>('');

  const openModal = (key: string) => {
    setCurrentModalTitle(key);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return <CustomModalContext.Provider value={{ currentModalTitle, isModalOpen, openModal, closeModal }}>{children}</CustomModalContext.Provider>;
};

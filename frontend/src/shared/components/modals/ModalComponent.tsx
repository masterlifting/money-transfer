/** @format */

import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';

interface IModalProps {
  children: React.ReactNode;
  id: string;
  title: string;
  onClose?: () => void;
}

export const Modal = ({ children, id, title, onClose }: IModalProps) => {
  const { isModalOpen, modalId } = useAppSelector(x => x.modalState);

  return isModalOpen && modalId && modalId === id ? (
    <div className='fixed inset-0 flex items-center justify-center'>
      <div className='fixed inset-0 bg-black opacity-80' onClick={onClose} />
      <div className='absolute bg-white p-5 rounded-md'>
        <h1 className='text-xl font-bold mb-2'>{title}</h1>
        {children}
      </div>
    </div>
  ) : null;
};

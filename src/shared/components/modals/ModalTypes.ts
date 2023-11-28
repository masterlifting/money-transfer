/** @format */

export interface IModalContext {
  modalId: string;
  isModalOpen: boolean;
  openModal: (key: string) => void;
  closeModal: () => void;
}

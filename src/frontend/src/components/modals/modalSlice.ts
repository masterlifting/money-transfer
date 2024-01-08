/** @format */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IModalState {
  modalId?: string;
  isModalOpen: boolean;
}

const initialState: IModalState = {
  isModalOpen: false,
};

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.modalId = action.payload;
      state.isModalOpen = true;
    },
    closeModal: state => {
      state.modalId = undefined;
      state.isModalOpen = false;
    },
  },
});

export const modalActions = modalSlice.actions;
export const modalReducer = modalSlice.reducer;

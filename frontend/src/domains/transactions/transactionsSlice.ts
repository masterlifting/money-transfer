/** @format */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserTransactionGet, IUserTransactionsGet } from '../../../../shared/types/userTransactionsTypes';

interface ITransactionsState {
  totalCount: number;
  transactions: IUserTransactionGet[];
}

const initialState: ITransactionsState = {
  totalCount: 0,
  transactions: [],
};

export const transactionsSlice = createSlice({
  name: 'transactionsSlice',
  initialState,
  reducers: {
    setTransactionsState: (state, action: PayloadAction<IUserTransactionsGet>) => {
      state.totalCount = action.payload.totalCount;
      state.transactions = action.payload.items;
    },
    changeState: state => {
      state.totalCount++;
    },
  },
});

export const transactionsActions = transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer;

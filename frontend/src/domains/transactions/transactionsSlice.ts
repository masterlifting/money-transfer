/** @format */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserTransactionGet, IUserTransactionsGet } from '../../../../shared/types/userTransactionsTypes';

interface ITransactionsState {
  transactions: IUserTransactionsGet;
}

const initialState: ITransactionsState = {
  transactions: {
    items: [],
    totalCount: 0,
  },
};

export const transactionsSlice = createSlice({
  name: 'transactionsSlice',
  initialState,
  reducers: {
    setTransactionsState: (state, action: PayloadAction<IUserTransactionsGet>) => {
      state.transactions = action.payload;
    },
    addTransactionToState: (state, action: PayloadAction<IUserTransactionGet>) => {
      state.transactions.items.push(action.payload);
      state.transactions.totalCount++;
    },
  },
});

export const transactionsActions = transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer;

/** @format */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserBalanceResponse } from '../../../../../shared/interfacesDto';
import { IUserBalanceState } from './userBalanceTypes';

const initialState: IUserBalanceState = {
  userBalance: {
    amount: {
      value: 0,
      currency: 'USD',
      symbol: '$',
    },
  },
};

export const userBalanceSlice = createSlice({
  name: 'userBalanceSlice',
  initialState,
  reducers: {
    setUserBalanceState: (state, action: PayloadAction<IUserBalanceResponse>) => {
      state.userBalance = action.payload.balance;
    },
  },
});

export const userBalanceActions = userBalanceSlice.actions;
export const userBalanceReducer = userBalanceSlice.reducer;

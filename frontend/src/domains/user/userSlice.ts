/** @format */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserBalance, IUserTransaction } from '../interfaces';
import { IUser } from '../../../../shared/interfaces';
import { IUserBalanceResponse, IUserTransactionsResponse, IUsersResponse } from '../../../../shared/interfacesDto';

interface IUserState {
  userEmail?: string;
  recepients: IUser[];
  balance?: IUserBalance;
  transactionsTotalCount: number;
  transactions: IUserTransaction[];
}

const initialState: IUserState = {
  recepients: [],
  transactions: [],
  transactionsTotalCount: 0,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserEmailState: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
    setRecepientsState: (state, action: PayloadAction<IUsersResponse>) => {
      if (state.userEmail) {
        state.recepients = action.payload.users.filter(x => x.email !== state.userEmail);
      } else {
        state.recepients = action.payload.users;
      }
    },
    setRecepientState: (state, action: PayloadAction<IUser>) => {
      state.recepients = [action.payload];
    },
    setUserBalanceState: (state, action: PayloadAction<IUserBalanceResponse>) => {
      state.balance = action.payload.balance;
    },
    setTransactionsState: (state, action: PayloadAction<IUserTransactionsResponse>) => {
      state.transactions = action.payload.items;
      state.transactionsTotalCount = action.payload.totalCount;
    },
    setTransactionsTotalCountState: state => {
      state.transactionsTotalCount++;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;

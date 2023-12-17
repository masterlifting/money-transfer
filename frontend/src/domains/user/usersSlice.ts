/** @format */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser, IUserBalance, IUserTransaction } from '../interfaces';
import { IAuthResponse, IUserBalanceResponse, IUserTransactionsResponse, IUsersResponse } from '../../../../shared/interfacesDto';

interface IUserState {
  userId?: string;
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

export const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    setUserIdState: (state, action: PayloadAction<IAuthResponse>) => {
      state.userId = action.payload.user.id;
    },
    setRecepientsState: (state, action: PayloadAction<IUsersResponse>) => {
      if (state.userId) {
        state.recepients = action.payload.users.filter(x => x.id !== state.userId);
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

export const usersActions = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

/** @format */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserBalance, IUserTransaction } from '../interfaces';
import { IUser } from '../../../../shared/interfaces';
import { IUserBalanceResponse, IUserTransactionsResponse, IUsersResponse } from '../../../../shared/interfacesDto';

interface IUserState {
  userEmail?: string;
  recipients: IUser[];
  balance?: IUserBalance;
  transactionsTotalCount: number;
  transactions: IUserTransaction[];
}

const initialState: IUserState = {
  recipients: [],
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
    setRecipientsState: (state, action: PayloadAction<IUsersResponse>) => {
      if (state.userEmail) {
        state.recipients = action.payload.users.filter(x => x.email !== state.userEmail);
      } else {
        state.recipients = action.payload.users;
      }
    },
    setRecipientState: (state, action: PayloadAction<IUser>) => {
      state.recipients = [action.payload];
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

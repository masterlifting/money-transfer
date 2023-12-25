/** @format */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../../../../shared/interfaces';
import { IUserTransactionsResponse, IUsersResponse } from '../../../../../shared/interfacesDto';
import { IUserTransactionsState } from './userTransactionsTypes';

const initialState: IUserTransactionsState = {
  userTransactionRecipients: [],
  userTransactions: [],
  userTransactionsTotalCount: 0,
};

export const userTransactionsSlice = createSlice({
  name: 'userTransactionsSlice',
  initialState,
  reducers: {
    setUserEmailState: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
    setUserTransactionsState: (state, action: PayloadAction<IUserTransactionsResponse>) => {
      state.userTransactions = action.payload.items;
      state.userTransactionsTotalCount = action.payload.totalCount;
    },
    setUserTransactionRecipientsState: (state, action: PayloadAction<IUsersResponse>) => {
      if (state.userEmail) {
        state.userTransactionRecipients = action.payload.users.filter(x => x.email !== state.userEmail);
      } else {
        state.userTransactionRecipients = action.payload.users;
      }
    },
    setUserTransactionRecipientState: (state, action: PayloadAction<IUser>) => {
      state.userTransactionRecipients = [action.payload];
    },
    addUserTransactionsTotalCountState: state => {
      state.userTransactionsTotalCount++;
    },
  },
});

export const userTransactionsActions = userTransactionsSlice.actions;
export const userTransactionsReducer = userTransactionsSlice.reducer;

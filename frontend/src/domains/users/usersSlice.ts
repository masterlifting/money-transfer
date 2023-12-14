/** @format */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserGet } from '../../../../shared/types/userTypes';
import { IUserBalanceGet } from '../../../../shared/types/userBalanceTypes';

interface IUsersState {
  users: IUserGet[];
  recepients: IUserGet[];
  userBalance?: IUserBalanceGet;
}

const initialState: IUsersState = {
  users: [],
  recepients: [],
};

export const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    setUsersState: (state, action: PayloadAction<IUserGet[]>) => {
      state.users = action.payload;
    },
    setRecepientsState: (state, action: PayloadAction<IUserGet[]>) => {
      if (state.userBalance) {
        state.recepients = action.payload.filter(x => x.id !== state.userBalance!.user.id);
      }
    },
    setUserBalance: (state, action: PayloadAction<IUserBalanceGet>) => {
      state.userBalance = action.payload;
    },
  },
});

export const usersActions = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

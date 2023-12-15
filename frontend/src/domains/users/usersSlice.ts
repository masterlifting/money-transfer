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
      if (state.userBalance) {
        state.recepients = state.users.filter(x => x.id !== state.userBalance!.user.id);
      }
    },
    setRecepientState: (state, action: PayloadAction<IUserGet>) => {
      state.recepients = [action.payload];
    },
    setUserBalanceState: (state, action: PayloadAction<IUserBalanceGet>) => {
      state.userBalance = action.payload;
    },
  },
});

export const usersActions = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

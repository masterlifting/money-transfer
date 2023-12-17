/** @format */

import { IAuthResponse } from '../../../../shared/interfacesDto';
import { IUser } from '../interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

//const authKey = 'internal_money-authkey';

interface IAuthState {
  user?: IUser;
  token?: string;
}

const initialState: IAuthState = {
  //user: JSON.parse(localStorage.getItem(authKey) || 'null'),
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<IAuthResponse>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      //localStorage.setItem(authKey, JSON.stringify(state.authUser));
    },
    clearAuthState: state => {
      state.user = undefined;
      state.token = undefined;
      //localStorage.removeItem(authKey);
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;

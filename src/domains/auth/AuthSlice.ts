/** @format */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuthState } from './AuthTypes';

const authUserKey = 'authUser';

const initialState: IAuthState = {
  authUser: JSON.parse(localStorage.getItem(authUserKey) || 'null'),
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<IAuthState>) => {
      state.authUser = action.payload.authUser;
      localStorage.setItem(authUserKey, JSON.stringify(state.authUser));
    },
    clearAuthState: state => {
      state.authUser = undefined;
      localStorage.removeItem(authUserKey);
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;

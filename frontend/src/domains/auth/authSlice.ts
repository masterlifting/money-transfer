/** @format */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuthUserGet } from '../../../../shared/types/authTypes';

const authUserKey = 'authUser';

interface IAuthState {
  authUser?: IAuthUserGet;
}

const initialState: IAuthState = {
  //authUser: JSON.parse(localStorage.getItem(authUserKey) || 'null'),
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<IAuthUserGet>) => {
      state.authUser = action.payload;
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

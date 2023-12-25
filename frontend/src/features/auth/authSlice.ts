/** @format */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuthResponse } from '../../../../shared/interfacesDto';
import { IAuthState } from './authTypes';

const sessionStarageKey = 'user_money_transfer';

const initialState: IAuthState = {
  user: JSON.parse(sessionStorage.getItem(sessionStarageKey) || 'null'),
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<IAuthResponse>) => {
      const token = `Bearer ${action.payload.token}`;
      state.user = { ...action.payload.user, token };

      sessionStorage.setItem(sessionStarageKey, JSON.stringify(action.payload.user));
    },
    clearAuthState: state => {
      state.user = undefined;
      sessionStorage.removeItem(sessionStarageKey);
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;

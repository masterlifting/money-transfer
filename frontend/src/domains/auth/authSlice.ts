/** @format */

import { IAuthResponse } from '../../../../shared/interfacesDto';
import { IUser } from '../interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const sessionStarageKey = 'user-internal_money';

interface IAuthState {
  user?: IUser;
}

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

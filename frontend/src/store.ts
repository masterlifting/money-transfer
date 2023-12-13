/** @format */

import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './domains/auth/authApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authReducer } from './domains/auth/authSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    authState: authReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

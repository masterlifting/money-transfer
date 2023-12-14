/** @format */

import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './domains/auth/authApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authReducer } from './domains/auth/authSlice';
import { usersApi } from './domains/users/usersApi';
import { transactionsApi } from './domains/transactions/transactionsApi';
import { usersReducer } from './domains/users/usersSlice';
import { transactionsReducer } from './domains/transactions/transactionsSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    authState: authReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    usersState: usersReducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    transactionsState: transactionsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware).concat(usersApi.middleware).concat(transactionsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

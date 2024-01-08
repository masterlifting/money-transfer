/** @format */

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { modalReducer } from './components/modals/modalSlice';
import { authApi } from './features/auth/authApi';
import { authReducer } from './features/auth/authSlice';
import { userBalanceApi } from './features/user/balance/userBalanceApi';
import { userBalanceReducer } from './features/user/balance/userBalanceSlice';
import { userTransactionsApi } from './features/user/transactions/userTransactionsApi';
import { userTransactionsReducer } from './features/user/transactions/userTransactionsSlice';

export const store = configureStore({
  reducer: {
    modalState: modalReducer,

    [authApi.reducerPath]: authApi.reducer,
    authState: authReducer,

    [userBalanceApi.reducerPath]: userBalanceApi.reducer,
    userBalanceState: userBalanceReducer,

    [userTransactionsApi.reducerPath]: userTransactionsApi.reducer,
    userTransactionsState: userTransactionsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware).concat(userBalanceApi.middleware).concat(userTransactionsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

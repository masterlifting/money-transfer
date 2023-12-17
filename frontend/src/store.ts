/** @format */

import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './domains/auth/authApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authReducer } from './domains/auth/authSlice';
import { usersApi } from './domains/user/usersApi';
import { usersReducer } from './domains/user/usersSlice';
import { modalReducer } from './shared/components/modals/modalSlice';

export const store = configureStore({
  reducer: {
    modalState: modalReducer,

    [authApi.reducerPath]: authApi.reducer,
    authState: authReducer,

    [usersApi.reducerPath]: usersApi.reducer,
    usersState: usersReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware).concat(usersApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

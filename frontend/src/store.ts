/** @format */

import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './domains/auth/authApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authReducer } from './domains/auth/authSlice';
import { userApi } from './domains/user/userApi';
import { userReducer } from './domains/user/userSlice';
import { modalReducer } from './shared/components/modals/modalSlice';

export const store = configureStore({
  reducer: {
    modalState: modalReducer,

    [authApi.reducerPath]: authApi.reducer,
    authState: authReducer,

    [userApi.reducerPath]: userApi.reducer,
    userState: userReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware).concat(userApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

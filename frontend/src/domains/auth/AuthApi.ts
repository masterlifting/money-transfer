/** @format */

import { FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAuthUserGet, IAuthUserPost } from './AuthTypes';
import { WebApiResponseType } from '../../shared/types/WebApiTypes';
import { constants } from '../../shared/Constants';

const controller = 'auth';

export const authApi = createApi({
  reducerPath: `${controller}Api`,
  baseQuery: fetchBaseQuery({ baseUrl: constants.http.baseFetchUrl }),
  endpoints: builder => ({
    loginUser: builder.mutation<WebApiResponseType<IAuthUserGet>, IAuthUserPost>({
      query: user => ({
        url: `${controller}/login`,
        method: constants.http.methods.POST,
        body: user,
      }),
      transformErrorResponse: (error: FetchBaseQueryError): string =>
        typeof error.status !== 'number' ? error.error : constants.http.defaultErrorMessage,
    }),
    registerUser: builder.mutation<WebApiResponseType<IAuthUserGet>, IAuthUserPost>({
      query: user => ({
        url: `${controller}/register`,
        method: constants.http.methods.POST,
        body: user,
      }),
      transformErrorResponse: (error: FetchBaseQueryError): string =>
        typeof error.status !== 'number' ? error.error : constants.http.defaultErrorMessage,
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;

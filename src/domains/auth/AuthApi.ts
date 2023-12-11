/** @format */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAuthUserGet, IAuthUserPost } from './AuthTypes';
import { WebApiResponseType } from '../../shared/types/WebApiTypes';
import { constants } from '../../shared/Constants';

const controller = 'auth';

export const authApi = createApi({
  reducerPath: `${controller}Api`,
  baseQuery: fetchBaseQuery({ baseUrl: constants.http.baseFetchUrl }),
  endpoints: builder => ({
    login: builder.mutation<WebApiResponseType<IAuthUserGet>, IAuthUserPost>({
      query: user => ({
        url: `${controller}/login`,
        method: constants.http.methods.POST,
        body: user,
      }),
      transformErrorResponse: _ => {
        return {
          isSuccess: false,
          error: {
            message: constants.http.defaultErrorMessage,
          },
        };
      },
    }),
    register: builder.mutation<WebApiResponseType<IAuthUserGet>, IAuthUserPost>({
      query: user => ({
        url: `${controller}/register`,
        method: constants.http.methods.POST,
        body: user,
      }),
      transformErrorResponse: _ => {
        return {
          isSuccess: false,
          error: {
            message: constants.http.defaultErrorMessage,
          },
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

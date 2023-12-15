/** @format */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAuthUserGet, IAuthUserPost } from '../../../../shared/types/authTypes';
import { WebApiResponseType } from '../../../../shared/types/webApiTypes';
import { constants } from '../../shared/constants';

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
    }),
    registerUser: builder.mutation<WebApiResponseType<IAuthUserGet>, IAuthUserPost>({
      query: user => ({
        url: `${controller}/register`,
        method: constants.http.methods.POST,
        body: user,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;

/** @format */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAuthRequest, IAuthResponse } from '../../../../shared/interfacesDto';
import { WebApiResponseType } from '../../../../shared/types';
import { constants } from '../../_constants';

const controller = 'auth';

export const authApi = createApi({
  reducerPath: `${controller}Api`,
  baseQuery: fetchBaseQuery({ baseUrl: constants.http.baseFetchUrl }),
  endpoints: builder => ({
    loginUser: builder.mutation<WebApiResponseType<IAuthResponse>, IAuthRequest>({
      query: user => ({
        url: `${controller}/login`,
        method: constants.http.methods.POST,
        body: user,
      }),
    }),
    registerUser: builder.mutation<WebApiResponseType<IAuthResponse>, IAuthRequest>({
      query: user => ({
        url: `${controller}/register`,
        method: constants.http.methods.POST,
        body: user,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;

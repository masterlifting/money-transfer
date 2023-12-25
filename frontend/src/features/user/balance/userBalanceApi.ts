/** @format */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUserBalanceResponse } from '../../../../../shared/interfacesDto';
import { WebApiResponseType } from '../../../../../shared/types';
import { constants } from '../../../_constants';
import { IUserBalanceGetRequest } from './userBalanceTypes';

const controller = 'users';

export const userBalanceApi = createApi({
  reducerPath: 'userBalanceApi',
  baseQuery: fetchBaseQuery({ baseUrl: constants.http.baseFetchUrl }),
  endpoints: builder => ({
    getUserBalance: builder.query<WebApiResponseType<IUserBalanceResponse>, IUserBalanceGetRequest>({
      query: request => ({
        headers: { Authorization: request.user.token },
        method: constants.http.methods.GET,
        url: `${controller}/${request.user.id}/balance`,
      }),
    }),
  }),
});

export const { useLazyGetUserBalanceQuery } = userBalanceApi;

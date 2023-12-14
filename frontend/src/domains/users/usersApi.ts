/** @format */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUserBalanceGet } from '../../../../shared/types/userBalanceTypes';
import { IUserGet } from '../../../../shared/types/userTypes';
import { WebApiResponseType } from '../../../../shared/types/webApiTypes';
import { constants } from '../../shared/constants';

const controller = 'users';

export const usersApi = createApi({
  reducerPath: `${controller}Api`,
  baseQuery: fetchBaseQuery({ baseUrl: constants.http.baseFetchUrl }),
  endpoints: builder => ({
    getUsers: builder.query<WebApiResponseType<IUserGet[]>, null>({
      query: _ => ({
        url: `${controller}`,
        method: constants.http.methods.GET,
      }),
    }),
    getUserBalance: builder.query<WebApiResponseType<IUserBalanceGet>, string>({
      query: userId => ({
        url: `${controller}/${userId}/balance`,
        method: constants.http.methods.GET,
      }),
    }),
  }),
});

export const { useLazyGetUsersQuery, useLazyGetUserBalanceQuery } = usersApi;

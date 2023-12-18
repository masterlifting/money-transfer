/** @format */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from '../../shared/constants';
import {
  IUserBalanceResponse,
  IUserTransactionResponse,
  IUserTransactionsResponse,
  IUsersResponse,
} from '../../../../shared/interfacesDto';
import { WebApiResponseType } from '../../../../shared/types';
import {
  IUserBalanceGetRequest,
  IUserTransactionPostRequest,
  IUserTransactionsGetRequest,
  IUsersGetRequest,
} from '../interfaces';

const controller = 'users';

export const usersApi = createApi({
  reducerPath: `${controller}Api`,
  baseQuery: fetchBaseQuery({ baseUrl: constants.http.baseFetchUrl }),
  endpoints: builder => ({
    getRecepients: builder.query<WebApiResponseType<IUsersResponse>, IUsersGetRequest>({
      query: request => ({
        headers: { Authorization: request.token },
        method: constants.http.methods.GET,
        url: `${controller}`,
        params: request.filter,
      }),
    }),
    getBalance: builder.query<WebApiResponseType<IUserBalanceResponse>, IUserBalanceGetRequest>({
      query: request => ({
        headers: { Authorization: request.user.token },
        method: constants.http.methods.GET,
        url: `${controller}/${request.user.id}/balance`,
      }),
    }),
    getTransactions: builder.query<WebApiResponseType<IUserTransactionsResponse>, IUserTransactionsGetRequest>({
      query: request => ({
        headers: { Authorization: request.user.token },
        url: `${controller}/${request.user.id}/transactions`,
        method: constants.http.methods.GET,
        params: request.filter,
      }),
    }),
    postTransaction: builder.mutation<WebApiResponseType<IUserTransactionResponse>, IUserTransactionPostRequest>({
      query: request => ({
        headers: { Authorization: request.user.token },
        method: constants.http.methods.POST,
        url: `${controller}/${request.user.id}/transaction`,
        body: request.transaction,
      }),
    }),
  }),
});

export const { useLazyGetRecepientsQuery, useLazyGetBalanceQuery, useLazyGetTransactionsQuery, usePostTransactionMutation } =
  usersApi;

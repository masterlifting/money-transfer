/** @format */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from '../../shared/constants';
import {
  IUserBalanceResponse,
  IUserTransactionResponse,
  IUserTransactionsResponse,
  IUsersResponse,
} from '../../../../shared/interfacesDto';
import { IDataFilter } from '../../../../shared/interfaces';
import { WebApiResponseType } from '../../../../shared/types';
import { IUserTransactionPostRequest, IUserTransactionsGetRequest } from '../interfaces';

const controller = 'users';

export const usersApi = createApi({
  reducerPath: `${controller}Api`,
  baseQuery: fetchBaseQuery({ baseUrl: constants.http.baseFetchUrl }),
  endpoints: builder => ({
    getRecepients: builder.query<WebApiResponseType<IUsersResponse>, IDataFilter | undefined>({
      query: _ => ({
        method: constants.http.methods.GET,
        url: `${controller}`,
      }),
    }),
    getBalance: builder.query<WebApiResponseType<IUserBalanceResponse>, string>({
      query: userId => ({
        method: constants.http.methods.GET,
        url: `${controller}/${userId}/balance`,
      }),
    }),
    getTransactions: builder.query<WebApiResponseType<IUserTransactionsResponse>, IUserTransactionsGetRequest>({
      query: request => ({
        url: `${controller}/${request.userId}/transactions`,
        method: constants.http.methods.GET,
        params: request.filter,
      }),
    }),
    postTransaction: builder.mutation<WebApiResponseType<IUserTransactionResponse>, IUserTransactionPostRequest>({
      query: request => ({
        method: constants.http.methods.POST,
        url: `${controller}/${request.userId}/transaction`,
        body: request.transaction,
      }),
    }),
  }),
});

export const { useLazyGetRecepientsQuery, useLazyGetBalanceQuery, useLazyGetTransactionsQuery, usePostTransactionMutation } =
  usersApi;

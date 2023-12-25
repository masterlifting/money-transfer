/** @format */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUserTransactionResponse, IUserTransactionsResponse, IUsersResponse } from '../../../../../shared/interfacesDto';
import { WebApiResponseType } from '../../../../../shared/types';
import { constants } from '../../../_constants';
import {
  IUserTransactionPostRequest,
  IUserTransactionRecipientsGetRequest,
  IUserTransactionsGetRequest,
} from '../transactions/userTransactionsTypes';

const controller = 'users';

export const userTransactionsApi = createApi({
  reducerPath: 'userTransactionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: constants.http.baseFetchUrl }),
  endpoints: builder => ({
    getUserTransactions: builder.query<WebApiResponseType<IUserTransactionsResponse>, IUserTransactionsGetRequest>({
      query: request => ({
        headers: { Authorization: request.user.token },
        url: `${controller}/${request.user.id}/transactions`,
        method: constants.http.methods.GET,
        params: request.filter,
      }),
    }),
    getUserTransactionRecipients: builder.query<WebApiResponseType<IUsersResponse>, IUserTransactionRecipientsGetRequest>({
      query: request => ({
        headers: { Authorization: request.token },
        method: constants.http.methods.GET,
        url: `${controller}`,
        params: request.filter,
      }),
    }),
    postUserTransaction: builder.mutation<WebApiResponseType<IUserTransactionResponse>, IUserTransactionPostRequest>({
      query: request => ({
        headers: { Authorization: request.user.token },
        method: constants.http.methods.POST,
        url: `${controller}/${request.user.id}/transaction`,
        body: request.transaction,
      }),
    }),
  }),
});

export const { useLazyGetUserTransactionRecipientsQuery, useLazyGetUserTransactionsQuery, usePostUserTransactionMutation } =
  userTransactionsApi;

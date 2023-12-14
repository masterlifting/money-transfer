/** @format */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WebApiResponseType } from '../../../../shared/types/webApiTypes';
import { constants } from '../../shared/constants';
import {
  IUserTransactionGet,
  IUserTransactionPost,
  IUserTransactionsFilter,
  IUserTransactionsGet,
} from '../../../../shared/types/userTransactionsTypes';

const controller = 'transactions';

export const transactionsApi = createApi({
  reducerPath: `${controller}Api`,
  baseQuery: fetchBaseQuery({ baseUrl: constants.http.baseFetchUrl }),
  endpoints: builder => ({
    getTransactions: builder.query<WebApiResponseType<IUserTransactionsGet>, IUserTransactionsFilter>({
      query: filter => ({
        url: `${controller}`,
        method: constants.http.methods.GET,
        params: {
          userId: filter.userId,
          pageNumber: filter.pagination?.pageNumber,
          pageItemsCount: filter.pagination?.pageItemsCount,
          fieldName: filter.sorting?.fieldName,
          direction: filter.sorting?.direction,
        },
      }),
    }),
    createTransaction: builder.mutation<WebApiResponseType<IUserTransactionGet>, IUserTransactionPost>({
      query: transaction => ({
        url: `${controller}`,
        method: constants.http.methods.POST,
        body: transaction,
      }),
    }),
  }),
});

export const { useGetTransactionsQuery, useCreateTransactionMutation } = transactionsApi;

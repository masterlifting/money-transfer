/** @format */

import { IValidationFailure, IValidationSuccess } from './interfaces';
import { IWebApiErrorResponse, IWebApiSuccessResponse } from './interfacesDto';

export type WebApiResponseType<T> = IWebApiSuccessResponse<T> | IWebApiErrorResponse;
export type ValidationResultType = IValidationSuccess | IValidationFailure;

export type AuthType = 'Login' | 'Register';
export type CurrencyType = 'USD';
export type CurrencySymbolType = '$';
export type UserTransactionType = 'Income' | 'Outcome';
export type UserTransactionStatusType = 'Created' | 'Pending' | 'Completed' | 'Failed';
export type SortingDirectionType = 'asc' | 'desc';
export type PaginationPageItemsCountType = 10 | 20 | 30 | 40 | 50;

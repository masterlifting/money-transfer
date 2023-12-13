/** @format */

import { IError } from '../components/errors/ErrorTypes';

interface IWebApiError extends IError {
  code?: number;
}

export interface IWebApiSuccessResponse<T> {
  isSuccess: true;
  data: T;
}

export interface IWebApiErrorResponse {
  isSuccess: false;
  error: IWebApiError;
}

export type WebApiResponseType<T> = IWebApiSuccessResponse<T> | IWebApiErrorResponse;

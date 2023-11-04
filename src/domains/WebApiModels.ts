/** @format */

type WebApiError = {
  message: string;
};

export interface IWebApiResponseSuccess<T> {
  isSuccess: true;
  data: T;
}

export interface IWebApiResponseError {
  isSuccess: false;
  error: WebApiError;
}

export type WebApiResponse<T> = IWebApiResponseSuccess<T> | IWebApiResponseError;

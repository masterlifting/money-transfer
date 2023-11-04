/** @format */

type WebApiError = {
  message: string;
};

export interface IWebApiSuccessResponse<T> {
  isSuccess: true;
  data: T;
}

export interface IWebApiErrorResponse {
  isSuccess: false;
  error: WebApiError;
}

export type WebApiResponse<T> = IWebApiSuccessResponse<T> | IWebApiErrorResponse;

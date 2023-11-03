/** @format */

export interface IWebApiPostResponse<T> {
  isSuccess: boolean;
  error?: string;
  data?: T;
}

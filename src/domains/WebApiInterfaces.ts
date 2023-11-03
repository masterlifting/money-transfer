/** @format */

type Error = {
  message: string;
};

export interface IWebApiPostResponse<T> {
  data: T | Error;
}

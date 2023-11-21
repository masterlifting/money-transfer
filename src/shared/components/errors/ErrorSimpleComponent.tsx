/** @format */

import { IErrorProps } from './ErrorValidationComponent';

export const SimpleError = ({ message }: IErrorProps) => {
  return <span className='text-red-500 text-sm'>{message}</span>;
};

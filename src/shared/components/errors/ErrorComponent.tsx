/** @format */

import { IError, IValidationFailure } from './ErrorTypes';

export interface IErrorProps {
  error: IError | IValidationFailure;
}

export const Error = ({ error }: IErrorProps) => {
  if (error.hasOwnProperty('errors')) {
    var errors = (error as IValidationFailure).errors;
    return (
      <ul className='text-red-500 text-sm'>
        {errors.map((x, index) => (
          <li key={index}>{x.message}</li>
        ))}
      </ul>
    );
  } else {
    return <span className='text-red-500 text-sm'>{(error as IError).message}</span>;
  }
};

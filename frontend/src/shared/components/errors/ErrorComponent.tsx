/** @format */

import { TextColor } from '../../styles/Colors';
import { IError, IValidationFailure } from './ErrorTypes';

export interface IErrorProps {
  error: IError | IValidationFailure;
}

export const Error = ({ error }: IErrorProps) => {
  if (error.hasOwnProperty('errors')) {
    var errors = (error as IValidationFailure).errors;
    return (
      <ul className={`${TextColor.Danger} text-xs`}>
        {errors.map((x, index) => (
          <li key={index}>{x.message}</li>
        ))}
      </ul>
    );
  } else {
    return <span className={`${TextColor.Danger} text-xs`}>{(error as IError).message}</span>;
  }
};

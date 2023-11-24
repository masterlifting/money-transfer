/** @format */

export interface IError {
  message: string;
}

export interface IValidationSuccess {
  isValid: true;
}

export interface IValidationFailure {
  isValid: false;
  errors: IError[];
}

export type ValidationResult = IValidationSuccess | IValidationFailure;

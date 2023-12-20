/** @format */

import React from 'react';
import { ButtonClass } from '../../styles/button';
import { ValidationResultType } from '../../../../../shared/types';

interface SubmitButtonProps {
  validationResult: ValidationResultType;
  name: string;
}

export const SubmitButton = ({ validationResult, name }: SubmitButtonProps) => {
  return (
    <button
      type='submit'
      title={!validationResult.isValid ? 'Fill in all fields' : undefined}
      disabled={!validationResult.isValid}
      className={validationResult.isValid ? ButtonClass.Success : ButtonClass.Disable}
    >
      {name}
    </button>
  );
};

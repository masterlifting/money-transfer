/** @format */

import React from 'react';
import { ButtonClass } from '../../styles/button';
import { ValidationResultType } from '../../../../../shared/types';
import { SvgIcon } from '../icons/SvgIconComponent';
import { SvgIcons } from '../icons/SvgIcons';

interface SubmitButtonProps {
  isLoading?: boolean;
  validationResult: ValidationResultType;
  name: string;
}

export const SubmitButton = ({ isLoading, validationResult, name }: SubmitButtonProps) => {
  return (
    <button
      type='submit'
      title={!validationResult.isValid ? 'Fill in all fields' : undefined}
      disabled={!validationResult.isValid}
      className={validationResult.isValid ? ButtonClass.Success : ButtonClass.Disable}
    >
      {isLoading ? (
        <span className='flex items-center'>
          <span className='mr-2'>{name}</span>
          <SvgIcon icon={SvgIcons.Spin} />
        </span>
      ) : (
        name
      )}
    </button>
  );
};

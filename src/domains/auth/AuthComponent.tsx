/** @format */

import { useEffect, useState } from 'react';
import { ValidationError } from '../../shared/components/errors/ErrorValidationComponent';
import { InputTextStyle } from '../../shared/styles/Input';
import { useAuthorizeUser } from './AuthHooks';
import { ButtonStyle } from '../../shared/styles/Button';
import { IAuthType } from './AuthTypes';

interface IAuthUserProps {
  type: IAuthType;
}

export const Auth = ({ type }: IAuthUserProps) => {
  const { validation, authUserPostModel, onSubmit, onChangeEmail, onChangePassword, setValidation } = useAuthorizeUser();
  const [confirmedPassword, setConfirmedPassword] = useState('');

  useEffect(() => {
    if (type === 'register') {
      if (authUserPostModel.password !== confirmedPassword) {
        setValidation({ isValid: false, message: 'Passwords do not match' });
      } else {
        setValidation({ isValid: true, message: '' });
      }
    }
  }, [authUserPostModel, confirmedPassword, setValidation, type]);

  const onChangeConfirmedPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmedPassword(event.target.value);
  };

  return (
    <form
      onSubmit={event => onSubmit(event, type)}
      className='w-80 absolute rounded-md left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/3'
    >
      <h1 className='text-2xl font-bold mb-2'>{type}</h1>
      {!validation.isValid && <ValidationError message={validation.message} />}
      <div className='flex flex-col items-center'>
        <input
          className={InputTextStyle.Text}
          type='email'
          placeholder='email'
          value={authUserPostModel.email}
          onChange={onChangeEmail}
          autoComplete='email'
        />
        <input
          className={InputTextStyle.Text}
          type='password'
          placeholder='password'
          value={authUserPostModel.password}
          onChange={onChangePassword}
          autoComplete='new-password'
        />
        {type === 'register' && (
          <input
            className={InputTextStyle.Text}
            type='password'
            placeholder='password'
            required={true}
            value={confirmedPassword}
            onChange={onChangeConfirmedPassword}
            autoComplete='current-password'
          />
        )}
      </div>
      <div className='flex justify-end'>
        <button
          type='submit'
          disabled={!validation.isValid}
          className={validation.isValid ? ButtonStyle.Success : ButtonStyle.Disable}
        >
          {type}
        </button>
      </div>
    </form>
  );
};

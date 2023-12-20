/** @format */

import React from 'react';
import { AuthType } from '../../../../shared/types';
import { Error } from '../../shared/components/errors/ErrorComponent';
import { InputClass } from '../../shared/styles/input';
import { useAuth } from './authHooks';
import { SubmitButton } from '../../shared/components/buttons/SubmitButtonComponent';

interface IAuthUserProps {
  authType: AuthType;
}

export const Auth = ({ authType }: IAuthUserProps) => {
  const {
    isLoading,
    validationResult,

    user,
    confirmedPassword,

    onChangeEmail,
    onChangePassword,
    onChangeConfirmedPassword,

    onSubmit,
  } = useAuth(authType);

  return (
    <form onSubmit={onSubmit} className='w-80 absolute rounded-md left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/3'>
      <h1 className='text-2xl font-bold mb-2'>{authType}</h1>
      {!validationResult.isValid && <Error error={validationResult} />}
      <div className='flex flex-col items-center'>
        <input
          className={InputClass.Text}
          name='email'
          title='Email'
          type='email'
          placeholder='email'
          autoComplete='email'
          value={user.email}
          onChange={onChangeEmail}
        />
        <input
          className={InputClass.Text}
          name='password'
          title='Password'
          type='password'
          placeholder='password'
          autoComplete='new-password'
          value={user.password}
          onChange={onChangePassword}
        />
        {authType === 'Register' && (
          <input
            required={true}
            className={InputClass.Text}
            name='repeat-password'
            title='Repeat password'
            type='password'
            placeholder='repeat password'
            autoComplete='current-password'
            value={confirmedPassword}
            onChange={onChangeConfirmedPassword}
          />
        )}
      </div>
      <div className='flex justify-end'>
        <SubmitButton isLoading={isLoading} validationResult={validationResult} name={authType} />
      </div>
    </form>
  );
};

/** @format */

import { Error } from '../../../shared/components/errors/ErrorComponent';
import { InputClass } from '../../../shared/styles/input';
import { useAuth } from '../authHooks';
import { ButtonClass } from '../../../shared/styles/button';
import { CircleLoader } from '../../../shared/components/loaders/CircleLoaderComponents';
import React from 'react';
import { AuthType } from '../../../../../shared/types/authTypes';

interface IAuthUserProps {
  authType: AuthType;
}

export const Auth = ({ authType }: IAuthUserProps) => {
  const {
    user,
    isLoading,
    validationResult,
    confirmedPassword,
    onChangeEmail,
    onChangePassword,
    onChangeConfirmedPassword,
    onSubmit,
  } = useAuth(authType);

  return isLoading ? (
    <CircleLoader />
  ) : (
    <form onSubmit={onSubmit} className='w-80 absolute rounded-md left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/3'>
      <h1 className='text-2xl font-bold mb-2'>{authType}</h1>
      {!validationResult.isValid && <Error error={validationResult} />}
      <div className='flex flex-col items-center'>
        <input
          className={InputClass.Text}
          type='email'
          placeholder='email'
          value={user.email}
          onChange={onChangeEmail}
          autoComplete='email'
        />
        <input
          className={InputClass.Text}
          type='password'
          placeholder='password'
          value={user.password}
          onChange={onChangePassword}
          autoComplete='new-password'
        />
        {authType === 'Register' && (
          <input
            className={InputClass.Text}
            type='password'
            placeholder='repeat password'
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
          title={!validationResult.isValid ? 'Fill in all fields' : undefined}
          disabled={!validationResult.isValid}
          className={validationResult.isValid ? ButtonClass.Success : ButtonClass.Disable}
        >
          {authType}
        </button>
      </div>
    </form>
  );
};

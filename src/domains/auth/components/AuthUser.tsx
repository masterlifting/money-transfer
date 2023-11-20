/** @format */

import { useEffect, useState } from 'react';
import { ValidationError } from '../../../shared/errors/ErrorComponents';
import { inputStyle } from '../../../styles/Input';
import { useAuthUser } from '../AuthHooks';
import { buttonStyle } from '../../../styles/Button';

interface IAuthUserProps {
  type: 'Login' | 'Register';
}

export const AuthUser = ({ type }: IAuthUserProps) => {
  const { validation, authUserPostModel, onSubmit, onChangeEmail, onChangePassword, setValidation } = useAuthUser();
  const [confirmedPassword, setConfirmedPassword] = useState('');

  useEffect(() => {
    if (type === 'Register') {
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
    <form onSubmit={onSubmit} className='absolute rounded-md left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/3'>
      <h1 className='text-2xl font-bold mb-2'>{type}</h1>
      {!validation.isValid && <ValidationError message={validation.message} />}
      <div className='flex flex-col items-center'>
        <input
          className={inputStyle.text}
          type='email'
          placeholder='email'
          value={authUserPostModel.email}
          onChange={onChangeEmail}
          autoComplete='email'
        />
        <input
          className={inputStyle.text}
          type='password'
          placeholder='password'
          value={authUserPostModel.password}
          onChange={onChangePassword}
          autoComplete='new-password'
        />
        {type === 'Register' && (
          <input
            className={inputStyle.text}
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
          className={validation.isValid ? buttonStyle.success : buttonStyle.disable}
        >
          {type}
        </button>
      </div>
    </form>
  );
};

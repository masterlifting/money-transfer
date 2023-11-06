/** @format */

import { useEffect, useState } from 'react';
import { ValidationError } from '../../../shared/errors/ErrorComponents';
import { ButtonStyle } from '../../../styles/Buttons';
import { InputStyle } from '../../../styles/Inputs';
import { useAuthUser } from '../AuthHooks';

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
      <h1 className='text-2xl font-bold'>{type}</h1>
      {!validation.isValid && <ValidationError message={validation.message} />}
      <div className='flex flex-col items-center'>
        <input className={InputStyle.text} type='email' placeholder='email' value={authUserPostModel.email} onChange={onChangeEmail} />
        <input className={InputStyle.text} type='password' placeholder='password' value={authUserPostModel.password} onChange={onChangePassword} />
        {type === 'Register' && <input className={InputStyle.text} type='password' placeholder='password' value={confirmedPassword} onChange={onChangeConfirmedPassword} />}
        <button disabled={!validation.isValid} className={validation.isValid ? ButtonStyle.success : ButtonStyle.disable}>
          {type}
        </button>
      </div>
    </form>
  );
};

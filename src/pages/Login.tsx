/** @format */

import { useState } from 'react';
import { useAuthState } from '../domains/auth/AuthHooks';
import { IAuthUserPost } from '../domains/auth/AuthTypes';
import { authorizeUser } from '../domains/auth/AuthData';
import { useNavigate } from 'react-router-dom';
import { ValidationError } from '../shared/errors/ErrorComponents';
import { IValidation } from '../domains/ValidationTypes';
import { ButtonStyle } from '../styles/Buttons';

export const Login = () => {
  const { setAuthState } = useAuthState();
  const navigate = useNavigate();

  const [validation, setValidation] = useState<IValidation>({ message: '', isValid: true });
  const [authUserPostModel, setauthUserPostModel] = useState<IAuthUserPost>({ email: '', password: '' });

  const inputClassName = 'w-40 border p-2 m-2 outline-0 rounded-md';

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidation({ message: '', isValid: true });

    const authorizedUserResponse = await authorizeUser(authUserPostModel);

    if (authorizedUserResponse.isSuccess) {
      setAuthState(authorizedUserResponse.data);
      navigate('/');
    } else {
      setValidation({ message: authorizedUserResponse.error.message, isValid: false });
    }
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setauthUserPostModel({ ...authUserPostModel, email: value });
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setauthUserPostModel({ ...authUserPostModel, password: value });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col items-center mt-6'>
        <input className={inputClassName} type='email' placeholder='email' value={authUserPostModel.email} onChange={onChangeEmail} />
        <input className={inputClassName} type='password' placeholder='password' value={authUserPostModel.password} onChange={onChangePassword} />
        <input className={inputClassName} type='password' placeholder='password' value={authUserPostModel.password} onChange={onChangePassword} />
        <button disabled={!validation} className={validation ? ButtonStyle.success : ButtonStyle.disable}>
          Login
        </button>
      </div>
      {!validation.isValid && <ValidationError message={validation.message} />}
    </form>
  );
};

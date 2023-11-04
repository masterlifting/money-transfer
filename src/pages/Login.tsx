/** @format */

import { useState } from 'react';
import { useAuthState } from '../domains/auth/AuthHooks';
import { IAuthUserPost } from '../domains/auth/AuthModels';
import { CustomError } from '../components/CustomError';
import { authorizeUser } from '../domains/auth/AuthData';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { setState } = useAuthState();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [validationError, setValidationError] = useState<string | null>(null);

  const buttonClassName = 'w-20 text-white p-1 rounded-md';
  const commitButtonClassName = `${buttonClassName} ${validationError === null ? 'bg-blue-300 hover:bg-green-300' : 'bg-gray-300 disabled:cursor-not-allowed'}`;
  const inputClassName = 'w-40 border p-2 m-2 outline-0 rounded-md';

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    setValidationError(null);

    event.preventDefault();

    const userLoginResponse = await authorizeUser({ email, password } as IAuthUserPost);

    if (userLoginResponse.isSuccess) {
      setState(userLoginResponse.data);
      navigate('/');
    } else {
      setValidationError(userLoginResponse.error!);
    }
  };

  const onEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
  };

  const onPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='flex justify-between items-center mb-2'>
        <input className={inputClassName} type='email' placeholder='email' value={email} onChange={onEmailHandler} />
        <input className={inputClassName} type='password' placeholder='password' value={password} onChange={onPasswordHandler} />
        <input className={inputClassName} type='password' placeholder='password' value={password} onChange={onPasswordHandler} />
      </div>
      <div className='flex justify-end'>
        <button type='submit' className={commitButtonClassName} disabled={validationError !== null}>
          Login
        </button>
      </div>
      {validationError !== null && <CustomError message={validationError} />}
    </form>
  );
};

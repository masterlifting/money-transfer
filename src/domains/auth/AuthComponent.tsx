/** @format */

import { Error } from '../../shared/components/errors/ErrorComponent';
import { InputClass } from '../../shared/styles/Input';
import { useAuth } from './AuthHooks';
import { ButtonClass } from '../../shared/styles/Button';
import { AuthType } from './AuthTypes';
import { CircleLoader } from '../../shared/components/loaders/CircleLoaderComponents';

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

  console.log('AuthComponent');

  return (
    <form onSubmit={onSubmit} className='w-80 absolute rounded-md left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/3'>
      <h1 className='text-2xl font-bold mb-2'>{authType}</h1>
      {isLoading && <CircleLoader />}
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

/** @format */

import { Error } from '../../shared/components/errors/ErrorComponent';
import { InputTextStyle } from '../../shared/styles/Input';
import { useAuth } from './AuthHooks';
import { ButtonStyle } from '../../shared/styles/Button';
import { IAuthType } from './AuthTypes';

interface IAuthUserProps {
  type: IAuthType;
}

export const Auth = ({ type }: IAuthUserProps) => {
  const {
    authUser,
    authUserConfirmedPassword,
    authUserValidationResult,
    onChangeAuthUserEmail,
    onChangeAuthUserPassword,
    onChangeAuthUserConfirmedPassword,
    onSubmitAuthUser,
  } = useAuth(type);

  return (
    <form
      onSubmit={onSubmitAuthUser}
      className='w-80 absolute rounded-md left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/3'
    >
      <h1 className='text-2xl font-bold mb-2'>{type}</h1>
      {!authUserValidationResult.isValid && <Error error={authUserValidationResult} />}
      <div className='flex flex-col items-center'>
        <input
          className={InputTextStyle.Text}
          type='email'
          placeholder='email'
          value={authUser.email}
          onChange={onChangeAuthUserEmail}
          autoComplete='email'
        />
        <input
          className={InputTextStyle.Text}
          type='password'
          placeholder='password'
          value={authUser.password}
          onChange={onChangeAuthUserPassword}
          autoComplete='new-password'
        />
        {type === 'register' && (
          <input
            className={InputTextStyle.Text}
            type='password'
            placeholder='repeat password'
            required={true}
            value={authUserConfirmedPassword}
            onChange={onChangeAuthUserConfirmedPassword}
            autoComplete='current-password'
          />
        )}
      </div>
      <div className='flex justify-end'>
        <button
          type='submit'
          disabled={!authUserValidationResult.isValid}
          className={authUserValidationResult.isValid ? ButtonStyle.Success : ButtonStyle.Disable}
        >
          {type}
        </button>
      </div>
    </form>
  );
};

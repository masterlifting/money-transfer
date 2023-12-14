/** @format */

import { Link, useNavigate } from 'react-router-dom';
import { SvgIcon } from '../icons/SvgIconComponent';
import { SvgIcons } from '../icons/SvgIcons';
import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { UserBalance } from '../../../domains/users/components/UserBalanceComponent';
import { useAppActions } from '../../hooks/useAppActions';

export const TopBar = () => {
  const navigate = useNavigate();
  const { authUser } = useAppSelector(x => x.authState);
  const { clearAuthState } = useAppActions();

  return (
    <nav className='h-14 bg-gray-800 flex justify-between items-center px-5 shadow-md'>
      <Link to='/' className='text-xl font-bold text-white hover:text-gray-300'>
        internal money
      </Link>
      <div className='flex gap-2'>
        {authUser ? (
          <div className='flex gap-4'>
            <p className='text-white'>{authUser.email}</p>
            <UserBalance />
            <SvgIcon
              icon={SvgIcons.Logout}
              title='Logout'
              handleClick={() => {
                clearAuthState();
                navigate('/login');
              }}
            />
          </div>
        ) : (
          <div className='flex gap-4'>
            <Link to='/register' className='text-white hover:text-gray-300'>
              Register
            </Link>
            <SvgIcon
              icon={SvgIcons.Login}
              title='Login'
              handleClick={() => {
                navigate('/login');
              }}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

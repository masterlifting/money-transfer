/** @format */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SvgIcon } from '../../components/icons/SvgIconComponent';
import { SvgIcons } from '../../components/icons/SvgIcons';
import { ShowUserBalance } from '../../features/user/balance/components/ShowUserBalanceComponent';
import { useAppActions } from '../../hooks/useAppActions';
import { useAppSelector } from '../../hooks/useAppSelector';

export const TopBar = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(x => x.authState);
  const { clearAuthState } = useAppActions();

  return (
    <nav className='h-14 bg-gray-800 flex justify-between items-center px-5 shadow-md'>
      <Link to='/' className='text-xl font-bold text-white hover:text-gray-300'>
        Money Transfer
      </Link>
      <div className='flex gap-2'>
        {user ? (
          <div className='flex gap-4'>
            <p className='text-white'>{user.email}</p>
            <ShowUserBalance />
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

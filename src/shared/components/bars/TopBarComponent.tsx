/** @format */

import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../domains/auth/AuthHooks';
import { UserBalance } from '../../../domains/user/balance/UserBalanceComponent';
import { SvgIcon } from '../icons/SvgIconComponent';
import { SvgIcons } from '../icons/SvgIcons';

export const TopBar = () => {
  const navigate = useNavigate();
  const { isAuthorized, authUser, setAuthState } = useAuthContext();

  return (
    <nav className='h-14 bg-gray-800 flex justify-between items-center px-5'>
      <Link to='/' className='text-xl font-bold text-white hover:text-gray-300'>
        internal money
      </Link>
      <div className='flex gap-2'>
        {isAuthorized ? (
          <div className='flex gap-4'>
            <p className='text-white'>{authUser!.email}</p>
            <UserBalance user={authUser!} />
            <SvgIcon
              icon={SvgIcons.Logout}
              handleClick={() => {
                setAuthState();
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

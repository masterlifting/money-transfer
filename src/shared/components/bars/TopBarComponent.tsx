/** @format */

import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from '../../../domains/auth/AuthHooks';
import { UserBalance } from '../../../domains/user/balance/UserBalanceComponent';

export const TopBar = () => {
  const navigate = useNavigate();
  const { isAuthorized, authUser, setAuthState } = useAuthState();

  return (
    <nav className='h-10 bg-gray-800 flex justify-between items-center px-5'>
      <Link to='/' className='text-xl font-bold text-white hover:text-gray-300'>
        internal money
      </Link>
      <div className='flex gap-2'>
        {isAuthorized ? (
          <div className='flex gap-2'>
            <p className='text-white'>{authUser!.email}</p>
            <UserBalance user={authUser!} />
            <button
              onClick={() => {
                setAuthState();
                navigate('/login');
              }}
              className='text-white hover:text-gray-300'
            >
              Logout
            </button>
          </div>
        ) : (
          <div className='flex gap-2'>
            <Link to='/register' className='text-white hover:text-gray-300'>
              Register
            </Link>
            <Link to='/login' className='text-white hover:text-gray-300'>
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

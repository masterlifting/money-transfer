/** @format */

import { Link } from 'react-router-dom';
import { useAuthState } from '../../domains/auth/AuthHooks';

export const TopBar = () => {
  const { isAuthorized: isAuthorised, authUser, setAuthState } = useAuthState();

  return (
    <nav className='h-10 bg-gray-800 flex justify-between items-center px-5'>
      <h5 className='text-xl font-bold text-white'>internal money</h5>
      <div className='flex gap-2'>
        <Link to='/' className='text-white hover:text-gray-300'>
          Home
        </Link>
        {isAuthorised ? (
          <div className='flex gap-2'>
            <p className='text-white'>{authUser?.email}</p>
            <button onClick={() => setAuthState()} className='text-white hover:text-gray-300'>
              Logout
            </button>
          </div>
        ) : (
          <Link to='/login' className='text-white hover:text-gray-300'>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};
/** @format */

import { Link } from 'react-router-dom';

export const UpBar = () => {
  return (
    <nav className='h-10 bg-gray-800 flex justify-between items-center px-5'>
      <h5 className='text-xl font-bold text-white'>internal money</h5>
      <div className='flex gap-2'>
        <Link to='/' className='text-white hover:text-gray-300'>
          Home
        </Link>
        <Link to='/login' className='text-white hover:text-gray-300'>
          Login
        </Link>
      </div>
    </nav>
  );
};

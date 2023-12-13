/** @format */

import React from 'react';

export const CircleLoader = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900'></div>
    </div>
  );
};

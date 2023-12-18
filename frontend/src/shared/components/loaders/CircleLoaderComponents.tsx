/** @format */

import React, { useState, useEffect } from 'react';

export const CircleLoader = () => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(true);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    showLoader && (
      <div className='fixed inset-0 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900'></div>
      </div>
    )
  );
};

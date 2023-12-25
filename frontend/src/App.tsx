/** @format */

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TopBar } from './layouts/bars/TopBarComponent';
import { Home } from './pages/Home';
import { UserLogin } from './pages/UserLogin';
import { UserRegister } from './pages/UserRegister';

export const App = () => (
  <>
    <TopBar />
    <div className='container mx-auto max-w-2xl pt-5'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/register' element={<UserRegister />} />
        <Route path='*' element={<h1>This page does not exist</h1>} />
      </Routes>
    </div>
  </>
);

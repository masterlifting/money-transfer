/** @format */

import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { UserLogin } from './pages/UserLogin';
import { TopBar } from './shared/components/bars/TopBarComponent';
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

/** @format */

import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { UpBar } from './pages/components/UpBar';

export default function App() {
  return (
    <>
      <UpBar />
      <div className='container mx-auto max-w-2xl pt-5'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

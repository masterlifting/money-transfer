/** @format */

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthState } from './domains/auth/AuthContext';
import { CustomModalState } from './shared/modal/CustomModalContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <AuthState>
      <CustomModalState>
        <App />
      </CustomModalState>
    </AuthState>
  </BrowserRouter>,
);

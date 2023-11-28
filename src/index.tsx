/** @format */

import './index.css';
import App from './App';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthState } from './domains/auth/AuthContext';
import { ModalState } from './shared/components/modals/ModalContext';
import { UserBalanceState } from './domains/balance/UserBalanceContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <ModalState>
      <AuthState>
        <UserBalanceState>
          <App />
        </UserBalanceState>
      </AuthState>
    </ModalState>
  </BrowserRouter>,
);

/** @format */

import './index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthStateProvider } from './domains/auth/AuthContext';
import { ModalStateProvider } from './shared/components/modals/ModalContext';
import { UserBalanceStateProvider } from './domains/balance/UserBalanceContext';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ModalStateProvider>
        <AuthStateProvider>
          <UserBalanceStateProvider>
            <App />
          </UserBalanceStateProvider>
        </AuthStateProvider>
      </ModalStateProvider>
    </BrowserRouter>
  </Provider>,
);

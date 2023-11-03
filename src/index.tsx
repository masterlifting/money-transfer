/** @format */

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CustomModalState } from './components/modal/CustomModalContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <CustomModalState>
    <App />
  </CustomModalState>,
);

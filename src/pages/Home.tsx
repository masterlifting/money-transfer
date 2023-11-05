/** @format */

import { useNavigate } from 'react-router-dom';
import { useAuthState } from '../domains/auth/AuthHooks';
import { TransactionList } from '../domains/transactions/components/TransactionList';
import { useEffect } from 'react';

export const Home = () => {
  const navigate = useNavigate();
  const { isAuthorized } = useAuthState();

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/login');
    }
  }, [isAuthorized, navigate]);

  return isAuthorized ? <TransactionList /> : null;
};

/** @format */

import { useEffect, useState } from 'react';
import { ITransaction } from '../models/TransactionInterfaces';
import { fetchTransactions } from '../data/transactionData';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);

    fetchTransactions(3).then(x => {
      try {
        setTransactions(x);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  return { transactions, loading, error };
};

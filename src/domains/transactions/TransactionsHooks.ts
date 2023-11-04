/** @format */

import { useEffect, useState } from 'react';
import { ITransactionGet } from './TransactionsModels';
import { fetchTransactions } from './TransactionsData';
import { WebApiResponse } from '../WebApiModels';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<ITransactionGet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addTransaction = (transaction: ITransactionGet) => {
    setTransactions(prev => [...prev, transaction]);
  };

  useEffect(() => {
    setLoading(true);

    fetchTransactions().then((x: WebApiResponse<ITransactionGet[]>) => {
      if (x.isSuccess) {
        setTransactions(x.data);
      } else {
        setError(x.error.message);
      }

      setLoading(false);
    });
  }, []);

  return { transactions, addTransaction, loading, error };
};

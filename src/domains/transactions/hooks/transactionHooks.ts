/** @format */

import { useEffect, useState } from 'react';
import { ITransactionGet } from '../models/TransactionInterfaces';
import { getTransactions } from '../data/TransactionsData';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<ITransactionGet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addTransaction = (transaction: ITransactionGet) => {
    setTransactions(prev => [...prev, transaction]);
  };

  useEffect(() => {
    setLoading(true);

    getTransactions(3).then(x => {
      try {
        setTransactions(x);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  return { transactions, addTransaction, loading, error };
};

export const useTransactionCreate = (transaction?: ITransactionGet) => {};

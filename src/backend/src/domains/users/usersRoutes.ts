/** @format */

import express, { Router } from 'express';
import { getBalance, get, getTransactions, postTransaction } from './usersController';

const usersRouter: Router = express.Router();

usersRouter.get('/', get);
usersRouter.get('/:id/balance', getBalance);
usersRouter.get('/:id/transactions', getTransactions);
usersRouter.post('/:id/transaction', postTransaction);

export default usersRouter;

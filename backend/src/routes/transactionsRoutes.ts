/** @format */

import express, { Router } from 'express';
import { getTransactions, postTransaction } from '../controllers/transactionsController';

const transactionsRouter: Router = express.Router();

transactionsRouter.get('/', getTransactions);
transactionsRouter.post('/', postTransaction);

export default transactionsRouter;

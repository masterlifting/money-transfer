/** @format */

import express, { Router } from 'express';
import { get, post } from './transactionsController';

const transactionsRouter: Router = express.Router();

transactionsRouter.get('/', get);
transactionsRouter.post('/', post);

export default transactionsRouter;

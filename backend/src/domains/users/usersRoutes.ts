/** @format */

import express, { Router } from 'express';
import { getBalance, get } from './usersController';

const usersRouter: Router = express.Router();

usersRouter.get('/', get);
usersRouter.get('/:id/balance', getBalance);

export default usersRouter;

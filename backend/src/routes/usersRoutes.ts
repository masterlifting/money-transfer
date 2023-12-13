/** @format */

import express, { Router } from 'express';
import { getUserBalance, getUsers } from '../controllers/usersController';

const usersRouter: Router = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id/balance', getUserBalance);

export default usersRouter;

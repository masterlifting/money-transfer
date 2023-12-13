/** @format */

import express, { Router } from 'express';
import { postLogin, postRegister } from '../controllers/authController';

const authRouter: Router = express.Router();

authRouter.post('/login', postLogin);
authRouter.post('/register', postRegister);

export default authRouter;

/** @format */

import express, { Application } from 'express';
import authRouter from './domains/auth/authRoutes';
import cors from 'cors';
import usersRouter from './domains/users/usersRoutes';
import { errorHandling, headerSettings } from './middlewares';
import morgan from 'morgan';

const app: Application = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
  }),
);

app.use(headerSettings);

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

app.use(errorHandling);

const port = 5000;

app.listen(port, () => console.log(`sharpdev-backend is running on port ${port}`));

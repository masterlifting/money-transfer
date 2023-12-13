/** @format */

import express, { Application } from 'express';
import authRouter from './routes/authRoutes';
import cors from 'cors';
import transactionsRouter from './routes/transactionsRoutes';
import usersRouter from './routes/usersRoutes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
  }),
);

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/transactions', transactionsRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`sharpdev-backend is running on port ${port}`));

/** @format */

import express, { Application } from 'express';
import authRouter from './routes/authRoutes';
import transactionsRouter from './routes/transactionsRoutes';
import usersRouter from './routes/usersRoutes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/transactions', transactionsRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

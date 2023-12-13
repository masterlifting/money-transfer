/** @format */

// src/app.ts
import express from 'express';
import router from './routes/route';

const app = express();
const port = 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

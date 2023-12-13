/** @format */

// src/app.ts
import express from 'express';

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

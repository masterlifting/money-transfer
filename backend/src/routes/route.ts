/** @format */

// src/routes/exampleRoutes.ts
import express, { Router } from 'express';
import { exampleController } from '../controllers/controller';

const router: Router = express.Router();

router.get('/example', exampleController);

export default router;

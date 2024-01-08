/** @format */

import { Request, Response } from 'express';
import { authService as service } from './authService';

export const login = (req: Request, res: Response) => res.send(service.login(req.body));
export const register = (req: Request, res: Response) => res.send(service.register(req.body));

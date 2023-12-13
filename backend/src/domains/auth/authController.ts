/** @format */

import { Request, Response } from 'express';
import { IAuthUserPost } from '../../types/AuthTypes';
import { authServices } from './authService';

export const login = (req: Request, res: Response) => {
  const request = req.body as IAuthUserPost;
  const response = authServices.login(request);
  res.send(response);
};

export const register = (req: Request, res: Response) => {
  const request = req.body as IAuthUserPost;
  const response = authServices.register(request);
  res.send(response);
};

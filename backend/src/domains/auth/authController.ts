/** @format */

import { Request, Response } from 'express';
import { IAuthRequest } from '../../interfacesDto';
import { authServices } from './authService';

export const login = (req: Request, res: Response) => {
  const request = req.body as IAuthRequest;
  const response = authServices.login(request);
  res.send(response);
};

export const register = (req: Request, res: Response) => {
  const request = req.body as IAuthRequest;
  const response = authServices.register(request);
  res.send(response);
};

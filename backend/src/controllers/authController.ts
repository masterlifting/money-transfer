/** @format */

import { Request, Response } from 'express';

export const postLogin = (req: Request, res: Response) => {
  res.send('Hello from the login controller!');
};

export const postRegister = (req: Request, res: Response) => {
  res.send('Hello from the register controller!');
};

/** @format */

import { Request, Response } from 'express';

export const getUsers = (req: Request, res: Response) => {
  res.send('Hello from the getUsers controller!');
};

export const getUserBalance = (req: Request, res: Response) => {
  res.send('Hello from the getUserBalance controller!');
};

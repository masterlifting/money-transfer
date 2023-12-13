/** @format */

import { Request, Response } from 'express';

export const exampleController = (req: Request, res: Response) => {
  res.send('Hello from the example controller!');
};

/** @format */

import { Request, Response, NextFunction } from 'express';
import { HandledError } from './shred/errorTypes';
import { IWebApiErrorResponse } from './interfacesDto';

export const errorHandling = (err: any, _: Request, res: Response, next: NextFunction) => {
  if (err instanceof HandledError) {
    console.error('\nHandledError: ', err.message);
    const response: IWebApiErrorResponse = {
      isSuccess: false,
      error: {
        message: err.message,
      },
    };
    res.send(response);
  } else {
    console.error('\nError: ', err.message);
    res.status(500).send({ error: err.message });
  }
};

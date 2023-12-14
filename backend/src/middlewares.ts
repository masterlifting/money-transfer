/** @format */

import { Request, Response, NextFunction } from 'express';
import { HandledError } from './shred/errorTypes';
import { IWebApiErrorResponse } from './types/webApiTypes';

export const errorHandling = (err: any, _: Request, res: Response, __: NextFunction) => {
  if (err instanceof HandledError) {
    console.error('HandledError: ', err.message);
    const response: IWebApiErrorResponse = {
      isSuccess: false,
      error: {
        message: err.message,
      },
    };
    res.send(response);
  } else {
    console.error('Error: ', err.message);
    res.status(500).send({ error: err.message });
  }
};

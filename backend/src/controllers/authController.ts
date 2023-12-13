/** @format */

import { Request, Response } from 'express';
import { repository } from '../persistence/DbRepository';
import { IAuthUserGet, IAuthUserPost } from '../types/AuthTypes';
import { WebApiResponseType } from '../types/WebApiTypes';
import { IUserTransactionGet } from '../types/UserTransactionsTypes';
import { v4 as guid } from 'uuid';

export const login = (req: Request, res: Response) => {
  const request: IAuthUserPost = req.body;
  let response: WebApiResponseType<IAuthUserGet>;

  const user = repository.users.getByEmail(request.email);

  if (user) {
    response = {
      isSuccess: true,
      data: {
        ...user,
        token: guid(),
        refreshToken: guid(),
      },
    };
  } else {
    response = {
      isSuccess: false,
      error: {
        code: 404,
        message: 'User not found',
      },
    };
  }

  res.send(response);
};

export const register = (req: Request, res: Response) => {
  const request: IAuthUserPost = req.body;
  let response: WebApiResponseType<IAuthUserGet>;

  let user = repository.users.getByEmail(request.email);

  if (user) {
    response = {
      isSuccess: false,
      error: {
        code: 400,
        message: 'User already exists',
      },
    };
  } else {
    user = {
      id: guid(),
      email: request.email,
    };

    repository.users.add(user);

    const presentTransaction: IUserTransactionGet = {
      id: guid(),
      date: new Date(),
      type: 'Income',
      status: 'Completed',
      amount: {
        value: 500,
        currency: 'USD',
        symbol: '$',
      },
      user: {
        id: guid(),
        email: 'internalmoney@gmail.com',
      },
      description: 'Welcome bonus from Internal Money',
    };

    try {
      repository.transactions.add(user.id, presentTransaction);

      response = {
        isSuccess: true,
        data: {
          ...user,
          token: guid(),
          refreshToken: guid(),
        },
      };
    } catch (error: any) {
      response = {
        isSuccess: false,
        error: {
          code: 400,
          message: error.message,
        },
      };
    }

    res.send(response);
  }
};

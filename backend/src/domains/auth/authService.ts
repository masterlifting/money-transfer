/** @format */

import { HandledError } from '../../shred/errorTypes';
import { IAuthUserGet, IAuthUserPost } from '../../types/authTypes';
import { IUserTransactionGet } from '../../types/userTransactionsTypes';
import { IWebApiSuccessResponse } from '../../types/webApiTypes';
import { transactionsRepository } from '../transactions/transactionsRepository';
import { usersRepository } from '../users/usersRepository';
import { v4 as guid } from 'uuid';

export const authServices = {
  login: (request: IAuthUserPost): IWebApiSuccessResponse<IAuthUserGet> => {
    const user = usersRepository.getByEmail(request.email);

    if (!user) {
      throw new HandledError('User not found');
    }

    return {
      isSuccess: true,
      data: {
        ...user,
        token: guid(),
        refreshToken: guid(),
      },
    };
  },

  register: (request: IAuthUserPost): IWebApiSuccessResponse<IAuthUserGet> => {
    let user = usersRepository.getByEmail(request.email);

    if (user) {
      throw new HandledError('User already exists');
    }

    user = {
      id: guid(),
      email: request.email,
    };

    usersRepository.add(user);

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

    transactionsRepository.add(user.id, presentTransaction);

    return {
      isSuccess: true,
      data: {
        ...user,
        token: guid(),
        refreshToken: guid(),
      },
    };
  },
};

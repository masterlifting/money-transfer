/** @format */

import { IAuthUserGet, IAuthUserPost } from '../../types/authTypes';
import { IUserTransactionGet } from '../../types/userTransactionsTypes';
import { WebApiResponseType } from '../../types/webApiTypes';
import { transactionsRepository } from '../transactions/transactionsRepository';
import { usersRepository } from '../users/usersRepository';
import { v4 as guid } from 'uuid';

export const authServices = {
  login: (request: IAuthUserPost): WebApiResponseType<IAuthUserGet> => {
    const user = usersRepository.getByEmail(request.email);
    return user
      ? {
          isSuccess: true,
          data: {
            ...user,
            token: guid(),
            refreshToken: guid(),
          },
        }
      : {
          isSuccess: false,
          error: {
            code: 404,
            message: 'User not found',
          },
        };
  },

  register: (request: IAuthUserPost): WebApiResponseType<IAuthUserGet> => {
    let user = usersRepository.getByEmail(request.email);

    if (user) {
      return {
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

      try {
        transactionsRepository.add(user.id, presentTransaction);

        return {
          isSuccess: true,
          data: {
            ...user,
            token: guid(),
            refreshToken: guid(),
          },
        };
      } catch (error: any) {
        return {
          isSuccess: false,
          error: {
            code: 400,
            message: error.message,
          },
        };
      }
    }
  },
};

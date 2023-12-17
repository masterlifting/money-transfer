/** @format */

import { HandledError } from '../../shred/errorTypes';
import { IAuthRequest, IAuthResponse, IWebApiSuccessResponse } from '../../interfacesDto';
import { usersRepository } from '../users/usersRepository';
import { v4 as guid } from 'uuid';

export const authServices = {
  login: (request: IAuthRequest): IWebApiSuccessResponse<IAuthResponse> => {
    const user = usersRepository.getByEmail(request.email);

    if (!user) {
      throw new HandledError('User not found');
    }

    return {
      isSuccess: true,
      data: {
        user,
        token: guid(),
      },
    };
  },

  register: (request: IAuthRequest): IWebApiSuccessResponse<IAuthResponse> => {
    const newUser = usersRepository.create({ email: request.email });

    usersRepository.createTransaction(newUser.id, {
      type: 'Income',
      amount: {
        value: 500,
        currency: 'USD',
        symbol: '$',
      },
      user: {
        id: '1',
        email: 'internalmoney@gmail.com',
      },
      description: 'Welcome bonus from Internal Money',
    });

    return {
      isSuccess: true,
      data: {
        user: newUser,
        token: guid(),
      },
    };
  },
};

/** @format */

import { IUserBalanceGet } from '../../types/UserBalanceTypes';
import { IUserGet } from '../../types/UserTypes';
import { WebApiResponseType } from '../../types/WebApiTypes';
import { usersRepository } from './usersRepository';

export const usersService = {
  get: (): WebApiResponseType<IUserGet[]> => {
    return {
      isSuccess: true,
      data: usersRepository.getAll(),
    };
  },

  getBalance: (userId: string): WebApiResponseType<IUserBalanceGet> => {
    try {
      const userBalance = usersRepository.getBalance(userId);

      return {
        isSuccess: true,
        data: userBalance,
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        error: error.message,
      };
    }
  },
};

/** @format */

import { IDataFilter } from '../../interfaces';
import {
  IUserBalanceResponse,
  IUsersResponse,
  IUserTransactionRequest,
  IUserTransactionResponse,
  IUserTransactionsResponse,
  IWebApiSuccessResponse,
} from '../../interfacesDto';
import { usersRepository } from './usersRepository';

export const usersService = {
  get: (filter?: IDataFilter): IWebApiSuccessResponse<IUsersResponse> => {
    return {
      isSuccess: true,
      data: {
        users: usersRepository.get(filter),
      },
    };
  },
  getBalance: (userId: string): IWebApiSuccessResponse<IUserBalanceResponse> => {
    return {
      isSuccess: true,
      data: {
        balance: usersRepository.getBalance(userId),
      },
    };
  },
  getTransactions: (userId: string, filter?: IDataFilter): IWebApiSuccessResponse<IUserTransactionsResponse> => {
    return {
      isSuccess: true,
      data: usersRepository.getTransactions(userId, filter),
    };
  },
  createTransaction: (userId: string, transaction: IUserTransactionRequest): IWebApiSuccessResponse<IUserTransactionResponse> => {
    const sender = usersRepository.getById(userId);

    if (!sender) {
      throw new Error('User not found');
    }

    const receiver = usersRepository.getById(transaction.user.id);

    if (!receiver) {
      throw new Error('Receiver not found');
    }

    const result = usersRepository.createTransaction(sender.id, {
      user: receiver,
      type: 'Outcome',
      amount: transaction.amount,
      description: transaction.description,
    });

    usersRepository.createTransaction(receiver.id, {
      user: sender,
      type: 'Income',
      amount: transaction.amount,
      description: transaction.description,
    });

    return {
      isSuccess: true,
      data: {
        transaction: result,
      },
    };
  },
};

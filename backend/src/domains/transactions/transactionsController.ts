/** @format */

import { Request, Response } from 'express';
import { IUserTransactionPost, IUserTransactionsFilter } from '../../types/userTransactionsTypes';
import { transactionsService } from './transactionsService';
import { PaginationPageItemsCountType } from '../../types/paginationTypes';

interface IUserTransactionsFilterQuery {
  userId?: string;
  pageNumber?: number;
  pageItemsCount?: PaginationPageItemsCountType;
  fieldName?: string;
  direction?: 'asc' | 'desc';
}

export const get = (req: Request, res: Response) => {
  const queryResult = req.query as IUserTransactionsFilterQuery;
  const filter: IUserTransactionsFilter = {
    userId: queryResult.userId,
    pagination: {
      pageNumber: queryResult.pageNumber!,
      pageItemsCount: queryResult.pageItemsCount!,
    },
    sorting: {
      fieldName: queryResult.fieldName!,
      direction: queryResult.direction!,
    },
  };
  const response = transactionsService.get(filter);
  res.send(response);
};

export const post = (req: Request, res: Response) => {
  const transaction = req.body as IUserTransactionPost;
  const response = transactionsService.add(transaction);
  res.send(response);
};

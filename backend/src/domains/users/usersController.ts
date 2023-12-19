/** @format */

import { Request, Response } from 'express';
import { usersService as service } from './usersService';

export const get = (req: Request, res: Response) => res.send(service.get(req.query));
export const getBalance = (req: Request, res: Response) => res.send(service.getBalance(req.params.id));
export const getTransactions = (req: Request, res: Response) => res.send(service.getTransactions(req.params.id, req.query));
export const postTransaction = (req: Request, res: Response) => res.send(service.createTransaction(req.params.id, req.body));

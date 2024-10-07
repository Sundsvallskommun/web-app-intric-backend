import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';

const adminMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (req.user.isAdmin) {
      next();
    } else {
      next(new HttpException(403, 'Insufficient permissions'));
    }
  } catch (error) {
    next(new HttpException(401, 'Failed to authorize'));
  }
};

export default adminMiddleware;

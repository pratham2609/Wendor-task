import { Request, Response, NextFunction } from 'express';
import errorHandler from './errorHandler';
import { ApiError } from './ApiError';

export default function catchAsyncError(controller: CallableFunction) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controller(req, res, next);
        } catch (error) {
            errorHandler(error as ApiError, req, res);
        }
    };
}
// src/middlewares/validate.ts
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ClientError } from '../utils/errors';

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const message = errors.array().map(err => err.msg).join(', ');
        return next(new ClientError(message));
    }

    next();
};

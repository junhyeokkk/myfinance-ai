// middlewares/errorMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { ClientError } from '../utils/errors';
import { sendError } from '../utils/response';

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('[Global Error]', err);

    if (err instanceof ClientError) {
        sendError(res, err.message, 400);
        return;
    }

    sendError(res, '서버 오류가 발생했습니다.', 500);
    return;
};

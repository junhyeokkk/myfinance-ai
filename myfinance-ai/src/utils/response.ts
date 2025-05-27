// 응답 모델 공통 

import { Response } from 'express';

export const sendSuccess = (res: Response, data: any = null, message = '요청 성공') => {
    return res.status(200).json({
        success: true,
        message,
        data,
    });
};

export const sendCreated = (res: Response, data: any = null, message = '생성 완료') => {
    res.status(201).json({
        success: true,
        message,
        data,
    });
};

export const sendError = (res: Response, message = '서버 오류', statusCode = 500) => {
    return res.status(statusCode).json({
        success: false,
        message,
    });
};

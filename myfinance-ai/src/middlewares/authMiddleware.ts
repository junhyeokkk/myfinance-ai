import {Request, RequestHandler} from 'express';
import jwt from 'jsonwebtoken';

import { JwtPayload } from 'jsonwebtoken';
import {JWT_SECRET} from "../config/config";

// 사용자 정의 JWT Payload 타입
interface DecodedToken extends JwtPayload {
    id: string; // 토큰에 id만 담겨 있다고 가정
}

// 확장된 Request 타입 정의
export interface AuthRequest extends Request {
    user: {
        id: string;
    };
}

export const authenticateJWT: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: '인증 토큰이 필요합니다.' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET as string) as DecodedToken;

        // 타입 단언해서 user 프로퍼티 추가
        (req as AuthRequest).user = { id: decoded.id };

        next();
    } catch (err) {
        res.status(403).json({ error: '유효하지 않은 토큰입니다.' });
    }
};

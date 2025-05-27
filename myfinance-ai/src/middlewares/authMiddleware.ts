import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/config';

// 사용자 정의 Payload 타입
interface DecodedToken extends JwtPayload {
    id: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
            };
        }
    }
}

export const authenticateJWT: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: '인증 토큰이 필요합니다.' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, config.jwt.secret) as DecodedToken;
        req.user = { id: decoded.id };
        next();
    } catch (err) {
        console.error('[JWT Error]', err);
        res.status(403).json({ error: '유효하지 않은 토큰입니다.' });
        return;
    }
};

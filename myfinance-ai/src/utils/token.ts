import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/config';

// 공통 타입
export interface TokenPayload {
    id: string;
}

// Access Token 생성
export const generateAccessToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.accessExpire, // ex) 15m
    });
};

// Refresh Token 생성
export const generateRefreshToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.refreshExpire, // ex) 7d
    });
};

// Access Token 검증
export const verifyAccessToken = (token: string): TokenPayload => {
    return jwt.verify(token, config.jwt.secret) as TokenPayload;
};

// Refresh Token 검증
export const verifyRefreshToken = (token: string): TokenPayload => {
    return jwt.verify(token, config.jwt.secret) as TokenPayload;
};

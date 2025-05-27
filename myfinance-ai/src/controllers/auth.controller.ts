import {Request, RequestHandler, Response} from 'express';
import {loginService, signupService} from "../services/auth.service";
import { ClientError } from '../utils/errors';

const JWT_SECRET = process.env.JWT_SECRET!;

// 회원가입
export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;
        await signupService(email, password, name);
        res.status(201).json({ message: '회원가입 성공' });
    } catch (error: any) {
         if (error instanceof ClientError) {
            res.status(400).json({ error: error.message });
            return;
        }
        res.status(500).json({ message: '서버 오류' });
    }
};

// 로그인
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken, user } = await loginService(email, password);

        res.status(200).json({
            accessToken,
            refreshToken,
            user: {
                email: user.email,
                name: user.name,
            },
        });
    } catch (error: any) {
        if (error instanceof ClientError) {
            return res.status(401).json({ error: error.message });
        }
        console.error('로그인 서버 오류:', error);
        return res.status(500).json({ error: '서버 오류' });
    }
};
import {Request, RequestHandler, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User'
import {loginService, signupService} from "../services/auth.service";

const JWT_SECRET = process.env.JWT_SECRET!;

// 회원가입
export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;
        await signupService(email, password, name);
        res.status(201).json({ message: '회원가입 성공' });
    } catch (error: any) {
        if (error.message === '이미 등록된 이메일입니다.') {
            res.status(400).json({ error: error.message });
        }
        res.status(500).json({ message: '서버 오류' });
    }
};

// 로그인
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await loginService(email, password);

        res.status(200).json({
            token,
            user: {
                email: user.email,
                name: user.name,
            },
        });
    } catch (error: any) {
        if (
            error.message === '사용자를 찾을 수 없습니다.' ||
            error.message === '비밀번호가 일치하지 않습니다.'
        ) {
            res.status(401).json({ error: error.message });
        }
        res.status(500).json({ error: '서버 오류' });
    }
};
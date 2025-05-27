import {NextFunction, Request, RequestHandler, Response} from 'express';
import {loginService, signupService} from "../services/auth.service";
import { ClientError } from '../utils/errors';
import { sendSuccess } from '../utils/response';

const JWT_SECRET = process.env.JWT_SECRET!;

// 회원가입
export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, name } = req.body;
        await signupService(email, password, name);
        sendSuccess(res, null, '회원가입 성공');
        return;
    } catch (error) {
        next(error); // 모든 에러는 전역 핸들러로
    }
};

// 로그인
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken, user } = await loginService(email, password);

        sendSuccess(res, {
            accessToken,
            refreshToken,
            user: {
                email: user.email,
                name: user.name,
            },
        }, '로그인 성공');
        return;
    } catch (error) {
        next(error);
    }
};
import {Request, RequestHandler, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User'

const JWT_SECRET = process.env.JWT_SECRET!;

// 회원가입 메서드
export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, name } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: '이미 등록된 이메일입니다.' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, name });
        await user.save();

        res.status(201).json({ message: '회원가입 성공' });
    } catch (error) {
        res.status(500).json({ message: '서버 오류' });
    }
};

// 로그인 메서드
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ error: '사용자를 찾을 수 없습니다.' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
            return;
        }

        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET as string, // 타입 에러 방지
            { expiresIn: '1d' }
        );

        res.status(200).json({
            token,
            user: {
                email: user.email,
                name: user.name,
            },
        });
    } catch (error) {
        console.error('로그인 에러', error);
        res.status(500).json({ error: '서버 오류' });
    }
};
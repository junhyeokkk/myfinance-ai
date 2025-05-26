import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { JWT_SECRET } from '../config/config';

// 회원가입
export const signupService = async (email: string, password: string, name: string) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('이미 등록된 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name });
    await user.save();

    return user;
};

// 로그인
export const loginService = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('사용자를 찾을 수 없습니다.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('비밀번호가 일치하지 않습니다.');
    }

    const token = jwt.sign(
        { userId: user._id },
        JWT_SECRET as string,
        { expiresIn: '1d' }
    );

    return { token, user };
};

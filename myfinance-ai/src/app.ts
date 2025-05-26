import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route'
import transactionRoutes from './routes/expense.route';

import {authenticateJWT} from "./middlewares/authMiddleware";

const app = express();

app.use(cors());
app.use(express.json());

// 인증이 필요 없는 라우트 (ex. 회원가입/로그인)
app.use('/auth', authRoutes);

// 인증 미들웨어를 전역에 적용 (이 아래 라우트는 인증 필요)
app.use(authenticateJWT);

// 인증이 필요한 라우트
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);

// 테스트용
app.get('/', (_, res) => {
    res.send('TypeScript API');
});


export default app;

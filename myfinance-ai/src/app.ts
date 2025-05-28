import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.route';
import expenseRoutes from './routes/expense.route';
import aiRoutes from './routes/ai.route';
import { errorHandler } from './middlewares/errorHandler';

// 향후 필요 시 userRoutes도 추가

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/expenses', expenseRoutes); // authenticateJWT는 라우터 내부에서 적용
app.use('/ai', aiRoutes); // authenticateJWT는 라우터 내부에서 적용


app.get('/', (_, res) => {
    res.send('TypeScript API');
});

app.use(errorHandler); // 항상 마지막에 위치 에러는 해당 핸들러로 잡음 코드 가독성 향상

export default app;

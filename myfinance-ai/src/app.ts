import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.route';
import expenseRoutes from './routes/expense.route';
// 향후 필요 시 userRoutes도 추가

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/expenses', expenseRoutes); // authenticateJWT는 라우터 내부에서 적용

app.get('/', (_, res) => {
    res.send('TypeScript API');
});

export default app;

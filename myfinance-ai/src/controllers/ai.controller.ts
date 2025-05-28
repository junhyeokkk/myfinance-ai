import { Request, Response, NextFunction } from 'express';
import { generateBudgetAdvice } from '../services/aiAnalysis.service';
import { sendSuccess } from '../utils/response';

export const analyzeExpenses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { month } = req.body;

    if (!month) {
        res.status(400).json({ message: 'month 파라미터가 필요합니다. 예: "2025-05"' });
        return;
    }

    const result = await generateBudgetAdvice(userId, month);

    sendSuccess(res, result, 'AI 예산 분석 완료');
  } catch (error) {
    next(error); // 전역 에러 핸들러로 위임
  }
};
import {NextFunction, Request, Response} from "express";
import Expense from "../models/Expense";
import {AuthRequest} from "../middlewares/authMiddleware";

/**
 * 소비 내역 등록
 */
export const createExpense = async (req: Request, res: Response) => {
    try {
        const { date, category, description, amount } = req.body;

        const authReq = req as AuthRequest;
        const userId = authReq.user?.id;

        const newExpense = await Expense.create({
            userId,
            date,
            category,
            description,
            amount,
        });

        res.status(201).json(newExpense);
    } catch (error) {
        console.error("소비 내역 등록 오류:", error);
        res.status(500).json({ message: "소비 내역 등록 중 오류가 발생했습니다." });
    }
};

/**
 * 특정 월 소비 내역 조회
 */

export const getExpensesByMonth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.id;

        if (!userId) {
            return res.status(401).json({ message: '인증 정보가 없습니다.' });
        }

        const { month } = req.query;

        if (!month || typeof month !== 'string') {
            return res.status(400).json({ message: 'month 쿼리 파라미터가 필요합니다. 예: 2025-05' });
        }

        const startDate = new Date(`${month}-01T00:00:00.000Z`);
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 1);

        const expenses = await Expense.find({
            userId,
            date: { $gte: startDate, $lt: endDate },
        }).sort({ date: 1 });

        res.status(200).json(expenses);
    } catch (error) {
        console.error('소비 내역 조회 오류:', error);
        next(error); // next() 호출로 에러 핸들링 위임 권장
    }
};


import { Request, Response, NextFunction } from 'express';
import {
    createExpenseService,
    deleteExpenseService,
    getExpensesByMonthService,
    getMonthlyTotalAmountService,
    updateExpenseService
} from '../services/expense.service';

import { ClientError } from '../utils/errors';
import { sendCreated, sendSuccess } from '../utils/response';

// 소비 내역 등록
export const createExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { date, category, description, amount } = req.body;
        const userId = req.user!.id;

        const newExpense = await createExpenseService(userId, date, category, description, amount);

        sendCreated(res, newExpense, '소비 내역이 등록되었습니다.');
        return;
    } catch (error) {
        next(error);
    }
};

// 특정 월 소비 내역 조회
export const getExpensesByMonth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.id;
        const { month } = req.query;

        if (!month || typeof month !== 'string') {
            throw new ClientError('month 쿼리 파라미터가 필요합니다. 예: 2025-05');
        }

        const expenses = await getExpensesByMonthService(userId, month);
        sendSuccess(res, expenses, '소비 내역 조회 완료');
        return;
    } catch (error) {
        next(error);
    }
};

// 월별 총 소비내역
export const getMonthlyTotalAmount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.id;
        const { month } = req.query;

        if (!month || typeof month !== 'string') {
            throw new ClientError('month 쿼리 파라미터가 필요합니다. 예: 2025-05');
        }

        const totalAmount = await getMonthlyTotalAmountService(userId, month);
        sendSuccess(res, { totalAmount }, '월별 총 소비 금액 조회 완료');
        return;
    } catch (error) {
        next(error);
    }
};

// 소비내역 수정
export const updateExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.id;
        const expenseId = req.params.id;
        const updateData = req.body;

        const updatedExpense = await updateExpenseService(userId, expenseId, updateData);

        if (!updatedExpense) {
            throw new ClientError('수정할 소비 내역이 없습니다.');
        }

        sendSuccess(res, updatedExpense, '소비 내역 수정 완료');
        return;
    } catch (error) {
        next(error);
    }
};

// 소비 내역 삭제
export const deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.id;
        const expenseId = req.params.id;

        const deletedExpense = await deleteExpenseService(userId, expenseId);

        if (!deletedExpense) {
            throw new ClientError('삭제할 소비 내역이 없습니다.');
        }

        sendSuccess(res, null, '소비 내역이 삭제되었습니다.');
        return;
    } catch (error) {
        next(error);
    }
};

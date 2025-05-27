import {NextFunction, Request, Response} from "express";
import {
    createExpenseService, deleteExpenseService,
    getExpensesByMonthService,
    getMonthlyTotalAmountService, updateExpenseService
} from "../services/expense.service";

// 해당 파일의 클래스에서는 미들웨어가 userId 예외처리 해주기때문에 따로 예외 처리 x

// 소비 내역 등록
export const createExpense = async (req: Request, res: Response) => {
    try {
        const { date, category, description, amount } = req.body;
         const userId = req.user!.id;

        const newExpense = await createExpenseService(userId, date, category, description, amount);

        res.status(201).json(newExpense);
    } catch (error) {
        console.error("소비 내역 등록 오류:", error);
        res.status(500).json({ message: "소비 내역 등록 중 오류가 발생했습니다." });
    }
};

// 특정 월 소비 내역 조회
export const getExpensesByMonth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user!.id;
        const { month } = req.query;

        if (!month || typeof month !== 'string') {
            res.status(400).json({ message: 'month 쿼리 파라미터가 필요합니다. 예: 2025-05' });
            return;
        }

        const expenses = await getExpensesByMonthService(userId, month);
        res.status(200).json(expenses);
    } catch (error) {
        console.error('소비 내역 조회 오류:', error);
        next(error);
    }
};

// 월별 총 소비내역
export const getMonthlyTotalAmount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user!.id;
        const { month } = req.query;

        if (!month || typeof month !== 'string') {
            res.status(400).json({ message: "month 쿼리 파라미터가 필요합니다. 예: 2025-05" });
            return;
        }

        const totalAmount = await getMonthlyTotalAmountService(userId, month);
        res.status(200).json({ totalAmount });
    } catch (error) {
        console.error("월별 총 소비 조회 오류:", error);
        next(error);
    }
};

// 소비내역 수정
export const updateExpense = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user!.id;
        const expenseId = req.params.id;
        const updateData = req.body;

        const updatedExpense = await updateExpenseService(userId, expenseId, updateData);

        if (!updatedExpense) {
            res.status(404).json({ message: '수정할 소비 내역이 없습니다.' });
        }

        res.status(200).json(updatedExpense);
    } catch (err) {
        console.error('소비 내역 수정 오류:', err);
        next(err);
    }
};

// 소비 내역 삭제
export const deleteExpense = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user!.id;
        const expenseId = req.params.id;

        const deletedExpense = await deleteExpenseService(userId, expenseId);

        if (!deletedExpense) {
            res.status(404).json({ message: '삭제할 소비 내역이 없습니다.' });
        }

        res.status(200).json({ message: '소비 내역이 삭제되었습니다.' });
    } catch (err) {
        console.error('소비 내역 삭제 오류:', err);
        next(err);
    }
};

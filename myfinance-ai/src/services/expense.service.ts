import Expense from "../models/Expense";
import mongoose from "mongoose";

// 소비 내역 등록
export const createExpenseService = async (
    userId: string,
    date: Date,
    category: string,
    description: string,
    amount: number
) => {
    const newExpense = await Expense.create({
        userId,
        date,
        category,
        description,
        amount,
    });

    return newExpense;
};

// 특정 월 소비 내역 조회
export const getExpensesByMonthService = async (
    userId: string,
    month: string
) => {
    const startDate = new Date(`${month}-01T00:00:00.000Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);

    const expenses = await Expense.find({
        userId: new mongoose.Types.ObjectId(userId),
        date: { $gte: startDate, $lt: endDate },
    }).sort({ date: 1 });

    return expenses;
};

// 월별 총 소비내역
export const getMonthlyTotalAmountService = async (
    userId: string,
    month: string
) => {
    const startDate = new Date(`${month}-01T00:00:00.000Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);

    const total = await Expense.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId),
                date: { $gte: startDate, $lt: endDate }
            }
        },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$amount" }
            }
        }
    ]);

    return total[0]?.totalAmount || 0;
};

// 소비내역 수정
export const updateExpenseService = async (
    userId: string,
    expenseId: string,
    updateData: Partial<{
        date: Date;
        category: string;
        description: string;
        amount: number;
    }>
) => {
    const updatedExpense = await Expense.findOneAndUpdate(
        { _id: expenseId, userId },
        updateData,
        { new: true }
    );

    return updatedExpense;
};

// 소비 내역 삭제
export const deleteExpenseService = async (
    userId: string,
    expenseId: string
) => {
    const deletedExpense = await Expense.findOneAndDelete({
        _id: expenseId,
        userId,
    });

    return deletedExpense;
};
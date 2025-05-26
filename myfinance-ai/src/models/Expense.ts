// 소비 기록 모델

import mongoose, { Schema, Document } from "mongoose";

// TypeScript 인터페이스 정의
export interface IExpense extends Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    date: Date;
    category: string;
    description: string;
    amount: number;
    createdAt: Date;
}

// Mongoose 스키마 정의
const ExpenseSchema = new Schema<IExpense>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true, // createdAt, updatedAt 자동 생성
    }
);

export default mongoose.model<IExpense>("Expense", ExpenseSchema);

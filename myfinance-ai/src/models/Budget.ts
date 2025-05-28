import mongoose, { Schema, Document } from "mongoose";

// 예산 모델
export interface ICategoryBudget {
    category: string;
    amount: number;
}

export interface IBudget extends Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    month: string; // "2025-05"
    totalAmount: number;
    categoryBudgets: ICategoryBudget[];
    createdAt: Date;
}

const CategoryBudgetSchema = new Schema<ICategoryBudget>(
    {
        category: { type: String, required: true },
        amount: { type: Number, required: true },
    },
    { _id: false } // 서브문서라서 _id는 불필요
);

const BudgetSchema = new Schema<IBudget>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        month: {
            type: String,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        categoryBudgets: {
            type: [CategoryBudgetSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IBudget>("Budget", BudgetSchema);

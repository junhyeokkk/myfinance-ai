import mongoose, { Schema, Document } from "mongoose";

// 예산 모델
export interface IBudget extends Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    month: string; // "2025-05"
    amount: number;
    createdAt: Date;
}

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
        amount: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IBudget>("Budget", BudgetSchema);

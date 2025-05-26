import mongoose, { Schema, Document } from "mongoose";

// AI 응답 기록 모델
export interface IAIAnalysisLog extends Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    month: string; // "2025-05"
    prompt: string;
    response: string;
    createdAt: Date;
}

const AIAnalysisLogSchema = new Schema<IAIAnalysisLog>(
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
        prompt: {
            type: String,
            required: true,
        },
        response: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IAIAnalysisLog>("AIAnalysisLog", AIAnalysisLogSchema);

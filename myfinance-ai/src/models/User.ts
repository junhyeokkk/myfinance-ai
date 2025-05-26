import mongoose, { Schema, Document } from "mongoose";

// 유저 모델
export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
}

// Mongoose 스키마 정의
const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true, // name이 필수라면 true, 선택이라면 false
        },
    },
    {
        timestamps: true, // createdAt, updatedAt 자동 생성
    }
);

export default mongoose.model<IUser>("User", UserSchema);

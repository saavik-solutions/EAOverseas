import mongoose, { Schema, Document } from 'mongoose';

export interface IMongoUser extends Document {
    fullName: string;
    email: string;
    avatarUrl?: string;
    role: string;
    firebaseUid?: string;
    trustScore: number;
    tags: string[];
    badges: string[];
}

const MongoUserSchema: Schema = new Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        avatarUrl: { type: String },
        role: { type: String, default: 'student' },
        firebaseUid: { type: String, sparse: true },
        trustScore: { type: Number, default: 0 },
        tags: [{ type: String }],
        badges: [{ type: String }],
    },
    { timestamps: true }
);

export const MongoUser = mongoose.model<IMongoUser>('MongoUser', MongoUserSchema);

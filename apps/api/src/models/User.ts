import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    fullName: string;
    email: string;
    phone?: string;
    passwordHash?: string;
    avatarUrl?: string;
    role: 'student' | 'counsellor' | 'university' | 'vendor' | 'admin';
    emailVerified: boolean;
    otpHash?: string;
    otpExpiry?: Date;
    otpAttempts: number;
    otpResendCount: number;
    failedLoginAttempts: number;
    accountLockedUntil?: Date;
    lastLogin?: Date;
    refreshTokens: string[];
    resetToken?: string;
    resetTokenExpiry?: Date;
    // Community / Legacy fields
    firebaseUid?: string;
    name: string; // alias for fullName for backward compat
    trustScore: number;
    tags: string[];
    badges: string[];
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        phone: { type: String },
        passwordHash: { type: String },
        avatarUrl: { type: String },
        role: { type: String, enum: ['student', 'counsellor', 'university', 'vendor', 'admin'], default: 'student' },
        emailVerified: { type: Boolean, default: false },
        otpHash: { type: String },
        otpExpiry: { type: Date },
        otpAttempts: { type: Number, default: 0 },
        otpResendCount: { type: Number, default: 0 },
        failedLoginAttempts: { type: Number, default: 0 },
        accountLockedUntil: { type: Date },
        lastLogin: { type: Date },
        refreshTokens: [{ type: String }],
        resetToken: { type: String },
        resetTokenExpiry: { type: Date },
        // Legacy / Community fields
        firebaseUid: { type: String, sparse: true },
        name: { type: String }, // backward-compat alias
        trustScore: { type: Number, default: 0 },
        tags: [{ type: String }],
        badges: [{ type: String }],
    },
    { timestamps: true }
);

// Pre-save hook: sync name ↔ fullName
UserSchema.pre('save', function (next) {
    if (this.isModified('fullName') && !this.name) {
        this.name = this.fullName;
    }
    if (this.isModified('name') && !this.fullName) {
        this.fullName = this.name;
    }
    next();
});

// UserSchema.index({ email: 1 }); // Redundant with unique: true

export const User = mongoose.model<IUser>('User', UserSchema);

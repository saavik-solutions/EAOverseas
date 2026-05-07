import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
    postId: mongoose.Schema.Types.ObjectId;
    authorId: mongoose.Schema.Types.ObjectId;
    content: string;
    upvotes: mongoose.Schema.Types.ObjectId[];
    downvotes: mongoose.Schema.Types.ObjectId[];
    score: number;
    isFlagged: boolean;
    replyTo?: mongoose.Schema.Types.ObjectId; // For nested replies
    isEdited: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
    {
        postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
        authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
        upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        score: { type: Number, default: 0 },
        isFlagged: { type: Boolean, default: false },
        isEdited: { type: Boolean, default: false },
        replyTo: { type: Schema.Types.ObjectId, ref: 'Comment' }, // Self-referencing for threads
    },
    { timestamps: true }
);

CommentSchema.index({ postId: 1, score: -1, createdAt: -1 });

export const Comment = mongoose.model<IComment>('Comment', CommentSchema);

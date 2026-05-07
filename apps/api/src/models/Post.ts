import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
    authorId: mongoose.Schema.Types.ObjectId;
    title: string;
    content: string;
    mediaUrls: string[];
    upvotes: mongoose.Schema.Types.ObjectId[];
    downvotes: mongoose.Schema.Types.ObjectId[];
    score: number; // calculated for algorithmic feed
    viewCount: number;
    commentCount: number;
    tags: string[]; // Zero-shot classification tags (e.g. Visa, Finances)
    semanticEmbedding?: number[]; // For semantic search
    isFlagged: boolean; // For toxicity detection
    tldrSummary?: string; // LLM thread summary
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema: Schema = new Schema(
    {
        authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
        mediaUrls: [{ type: String }],
        upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        score: { type: Number, default: 0 },
        viewCount: { type: Number, default: 0 },
        commentCount: { type: Number, default: 0 },
        tags: [{ type: String }],
        semanticEmbedding: [{ type: Number }], // For vector index
        isFlagged: { type: Boolean, default: false },
        tldrSummary: { type: String },
    },
    { timestamps: true }
);

// Indexes for algorithmic sorting and search
PostSchema.index({ score: -1, createdAt: -1 });
PostSchema.index({ tags: 1 });
PostSchema.index({ '$**': 'text' }); // Basic text search fallback

export const Post = mongoose.model<IPost>('Post', PostSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IConversation extends Document {
    participants: mongoose.Schema.Types.ObjectId[];
    lastMessage?: mongoose.Schema.Types.ObjectId;
}

const ConversationSchema: Schema = new Schema(
    {
        participants: [{ type: Schema.Types.ObjectId, ref: 'MongoUser', required: true }],
        lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
    },
    { timestamps: true }
);

ConversationSchema.index({ participants: 1 });

export const Conversation = mongoose.model<IConversation>('Conversation', ConversationSchema);

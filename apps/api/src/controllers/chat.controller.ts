import { Request, Response } from 'express';
import { Conversation } from '../models/Conversation';
import { Message } from '../models/Message';
import { User } from '../models/User';

// 1. Get all conversations for a user
export const getConversations = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const userObj = await User.findOne({ firebaseUid: userId }) || await User.findById(userId);
        if (!userObj) return res.status(404).json({ error: 'User not found' });

        const conversations = await Conversation.find({
            participants: userObj._id
        })
            .populate('participants', 'name avatarUrl role')
            .populate({
                path: 'lastMessage',
                select: 'content createdAt senderId'
            })
            .sort({ updatedAt: -1 });

        res.status(200).json(conversations);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Get message history for a conversation
export const getMessages = async (req: Request, res: Response) => {
    try {
        const { conversationId } = req.params;
        const messages = await Message.find({ conversationId })
            .populate('senderId', 'name avatarUrl')
            .sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Start or get an existing 1-on-1 conversation
export const getOrCreateConversation = async (req: Request, res: Response) => {
    try {
        const { userId, targetUserId } = req.body;

        const user1 = await User.findOne({ firebaseUid: userId }) || await User.findById(userId);
        const user2 = await User.findOne({ firebaseUid: targetUserId }) || await User.findById(targetUserId);

        if (!user1 || !user2) return res.status(404).json({ error: 'One or both users not found' });

        let conversation = await Conversation.findOne({
            participants: { $all: [user1._id, user2._id], $size: 2 }
        }).populate('participants', 'name avatarUrl role');

        if (!conversation) {
            conversation = new Conversation({
                participants: [user1._id, user2._id],
            });
            await conversation.save();
            await conversation.populate('participants', 'name avatarUrl role');
        }

        res.status(200).json(conversation);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

import { FastifyRequest, FastifyReply } from 'fastify';
import { Conversation } from './models/Conversation';
import { Message } from './models/Message';
import { MongoUser } from './models/MongoUser';

export const getConversations = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const user = req.user;
    const userObj = await MongoUser.findOne({ email: user.email }) || await MongoUser.findOne({ firebaseUid: user.id });
    
    if (!userObj) return reply.status(404).send({ error: 'User not found' });

    const conversations = await Conversation.find({
      participants: userObj._id
    })
      .populate('participants', 'fullName avatarUrl role')
      .populate({
        path: 'lastMessage',
        select: 'content createdAt senderId'
      })
      .sort({ updatedAt: -1 });

    return reply.status(200).send(conversations);
  } catch (error: any) {
    req.log.error(error);
    return reply.status(500).send({ error: error.message });
  }
};

export const getMessages = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { conversationId } = req.params as any;
    const messages = await Message.find({ conversationId })
      .populate('senderId', 'fullName avatarUrl')
      .sort({ createdAt: 1 });

    return reply.status(200).send(messages);
  } catch (error: any) {
    req.log.error(error);
    return reply.status(500).send({ error: error.message });
  }
};

export const getOrCreateConversation = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const user = req.user;
    const { targetUserId } = req.body as any;

    const user1 = await MongoUser.findOne({ email: user.email }) || await MongoUser.findOne({ firebaseUid: user.id });
    const user2 = await MongoUser.findOne({ firebaseUid: targetUserId }) || await MongoUser.findById(targetUserId);

    if (!user1 || !user2) return reply.status(404).send({ error: 'One or both users not found' });

    let conversation = await Conversation.findOne({
      participants: { $all: [user1._id, user2._id], $size: 2 }
    }).populate('participants', 'fullName avatarUrl role');

    if (!conversation) {
      conversation = new Conversation({
        participants: [user1._id, user2._id],
      });
      await conversation.save();
      await (conversation as any).populate('participants', 'fullName avatarUrl role');
    }

    return reply.status(200).send(conversation);
  } catch (error: any) {
    req.log.error(error);
    return reply.status(500).send({ error: error.message });
  }
};

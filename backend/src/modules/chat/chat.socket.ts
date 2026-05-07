import { FastifyInstance } from 'fastify';
import 'fastify-socket.io';
import { Message } from './models/Message';
import { Conversation } from './models/Conversation';
import { MongoUser } from './models/MongoUser';

export function registerChatSocket(app: FastifyInstance) {
  (app as any).io.on('connection', (socket: any) => {
    app.log.info(`User connected: ${socket.id}`);

    socket.on('join_conversation', (conversationId: string) => {
      socket.join(conversationId);
    });

    socket.on('send_message', async (data: { conversationId: string, senderId: string, content: string }) => {
      try {
        const { conversationId, senderId, content } = data;

        const sender = await MongoUser.findOne({ firebaseUid: senderId }) || await MongoUser.findById(senderId);
        if (!sender) return;

        const newMessage = new Message({
          conversationId,
          senderId: sender._id,
          content
        });
        await newMessage.save();

        await Conversation.findByIdAndUpdate(conversationId, {
          lastMessage: newMessage._id,
          updatedAt: new Date()
        });

        const populatedMessage = await Message.findById(newMessage._id).populate('senderId', 'fullName avatarUrl');
        
        (app as any).io.to(conversationId).emit('receive_message', populatedMessage);
        (app as any).io.emit('conversation_updated', { conversationId });

      } catch (error) {
        app.log.error(error, "Socket error (send_message)");
      }
    });

    socket.on('disconnect', () => {
      app.log.info(`User disconnected: ${socket.id}`);
    });
  });
}

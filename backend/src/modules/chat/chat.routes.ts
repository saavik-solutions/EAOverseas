import { FastifyInstance } from 'fastify';
import { getConversations, getMessages, getOrCreateConversation } from './chat.controller';
import { authenticate } from '../../shared/middleware/authenticate';

export default async function chatRoutes(app: FastifyInstance) {
  app.get('/conversations', { preHandler: [authenticate] }, getConversations);
  app.get('/messages/:conversationId', { preHandler: [authenticate] }, getMessages);
  app.post('/conversations', { preHandler: [authenticate] }, getOrCreateConversation);
}

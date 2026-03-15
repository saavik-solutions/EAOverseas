import express from 'express';
import { getConversations, getMessages, getOrCreateConversation } from '../controllers/chat.controller';

const router = express.Router();

router.get('/conversations/:userId', getConversations);
router.get('/messages/:conversationId', getMessages);
router.post('/conversation', getOrCreateConversation);

export default router;

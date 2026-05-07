import { Router } from 'express';
import { getFeed, createPost, getTrendingTopics, toggleLikePost, addComment, editComment, translateFeedItem } from '../controllers/feed.controller';
import { User } from '../models/User';
import { verifyJWT } from '../middleware/verifyJWT';

const router = Router();

router.get('/', getFeed);
router.post('/', verifyJWT, createPost);
router.get('/trending', getTrendingTopics);
router.post('/:postId/toggle-like', verifyJWT, toggleLikePost);
router.post('/:postId/comment', verifyJWT, addComment);
router.put('/comment/:commentId', verifyJWT, editComment);
router.post('/translate', translateFeedItem);

// User search for chat
router.get('/users', async (req, res) => {
    try {
        const { search } = req.query;
        if (!search) return res.status(200).json([]);
        const users = await User.find({
            name: { $regex: search, $options: 'i' }
        }).select('name avatarUrl role firebaseUid').limit(10).lean();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;

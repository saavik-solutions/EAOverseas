import { Request, Response } from 'express';
import { Post } from '../models/Post';
import { User } from '../models/User';
import { Comment } from '../models/Comment';
import { checkContentSafety } from '../services/moderationService';
import { generateEmbedding } from '../services/embeddingService';
import { translateText } from '../services/translationService';
import { AuthRequest } from '../middleware/verifyJWT';

// 1. Algorithmic Relevance Feed
export const getFeed = async (req: Request, res: Response) => {
    try {
        const { topic, page = 1, limit = 10, userId, search } = req.query;

        const query: any = {};
        if (topic && topic !== 'All Topics' && topic !== 'Algorithmic Feed' && topic !== 'Personalized') {
            query.tags = topic;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
                { tags: { $regex: search, $options: 'i' } }
            ];
        }

        // --- PERSONALIZATION ENGINE ---
        let userInterests: string[] = [];
        if (userId) {
            // Find tags of posts this user has liked recently
            const userObj = await User.findOne({ firebaseUid: userId }) || await User.findById(userId);
            if (userObj) {
                const likedPosts = await Post.find({ upvotes: userObj._id }).limit(50).select('tags');
                const tagFrequency: Record<string, number> = {};
                likedPosts.forEach(p => p.tags.forEach(t => tagFrequency[t] = (tagFrequency[t] || 0) + 1));
                userInterests = Object.keys(tagFrequency).sort((a, b) => tagFrequency[b] - tagFrequency[a]).slice(0, 5);
            }
        }

        // --- SEMANTIC SEARCH ENGINE ---
        let searchVector: number[] | null = null;
        if (search) {
            searchVector = await generateEmbedding(search as string);
        }

        const posts = await Post.find(query)
            .populate('authorId', 'name avatarUrl role badges trustScore')
            .lean();

        // ── SCORING & PERSONALIZATION ───────────────────────────────────────
        const now = new Date().getTime();
        const scoredPosts = posts.map((post: any) => {
            let score = post.score || 0;

            // 1. Keyword/Regex Match Score (Already handled by Post.find(query), but we can refine here)
            // If post title/content explicitly contains search term, give it a big boost
            if (search) {
                const s = (search as string).toLowerCase();
                if (post.title.toLowerCase().includes(s) || post.content.toLowerCase().includes(s)) {
                    score += 50;
                }
            }

            // 2. Semantic Similarity Boost (Vector Embeddings)
            if (searchVector && post.semanticEmbedding && post.semanticEmbedding.length > 0) {
                // Calculation: Cosine Similarity fallback (dot product since the vectors are normalized by OpenAI)
                const similarity = searchVector.reduce((acc, val, i) => acc + (val * (post.semanticEmbedding[i] || 0)), 0);
                const semanticBoost = similarity * 100; // Boost proportional to similarity
                score += semanticBoost;
            }

            // 3. Interest Boost (if post tags match user interests)
            const matchCount = post.tags.filter((t: string) => userInterests.includes(t)).length;
            const interestBoost = matchCount * 25;
            score += interestBoost;

            // 4. Recency Decay (Linear decay over 7 days)
            const ageInHours = (now - new Date(post.createdAt).getTime()) / (1000 * 60 * 60);
            const recencyFactor = Math.max(0, 1 - (ageInHours / (24 * 7)));
            const recencyScore = recencyFactor * 30;
            score += recencyScore;

            return { ...post, calculatedRank: score };
        });

        // Sort by calculated rank
        scoredPosts.sort((a, b) => b.calculatedRank - a.calculatedRank);

        // Pagination
        const paginatedPosts = scoredPosts.slice((Number(page) - 1) * Number(limit), Number(page) * Number(limit));

        // Fetch comments for these posts
        const postIds = paginatedPosts.map(p => p._id);
        const comments = await Comment.find({ postId: { $in: postIds } })
            .populate('authorId', 'name avatarUrl')
            .sort({ createdAt: -1 })
            .lean();

        const formattedPosts = paginatedPosts.map(post => {
            const postComments = comments
                .filter(c => c.postId.toString() === post._id.toString())
                .map(c => ({
                    _id: c._id,
                    author: (c.authorId as any)?.name || 'Anonymous',
                    avatar: (c.authorId as any)?.avatarUrl || 'https://i.pravatar.cc/150?u=100',
                    text: c.content,
                    time: c.createdAt,
                    isEdited: c.isEdited || false,
                    replyTo: c.replyTo || null,
                }));

            return {
                ...post,
                hasLiked: userId ? post.upvotes.map((id: any) => id.toString()).includes(userId as string) : false,
                comments: postComments,
                commentsCount: post.commentCount
            };
        });

        res.status(200).json({ posts: formattedPosts });
    } catch (error) {
        console.error("error in getFeed:", error);
        res.status(500).json({ error: 'Failed to fetch feed' });
    }
};

export const createPost = async (req: AuthRequest, res: Response) => {
    try {
        const { title, content, tags } = req.body;
        const authorId = req.user?.user_id;

        if (!authorId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const user = await User.findById(authorId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // --- AI MODERATION & EMBEDDING ---
        const [safetyResult, embedding] = await Promise.all([
            checkContentSafety(`${title} ${content}`),
            generateEmbedding(`${title} ${content}`)
        ]);

        if (safetyResult.flagged) {
            console.warn("Post content flagged as unsafe:", safetyResult.reason);
            return res.status(403).json({
                error: 'Content Safety Violation',
                code: 'SAFETY_VIOLATION',
                reason: safetyResult.reason
            });
        }

        const post = new Post({
            authorId: user._id,
            title,
            content,
            tags: tags || ['General'],
            score: 1,
            semanticEmbedding: embedding
        });

        await post.save();
        res.status(201).json({ post });
    } catch (error: any) {
        console.error("error in createPost:", error.message || error);
        res.status(500).json({ error: 'Failed to create post', details: error.message });
    }
};

export const getTrendingTopics = async (req: Request, res: Response) => {
    try {
        // 5. Trending Topic Extraction (Aggregation Pipeline pseudo-TF-IDF mapping)
        // Groups by tags over the last 24-48 hours and counts frequency
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const trending = await Post.aggregate([
            { $match: { createdAt: { $gte: oneWeekAgo } } },
            { $unwind: "$tags" },
            { $group: { _id: "$tags", count: { $sum: 1 }, avgScore: { $avg: "$score" } } },
            { $sort: { count: -1, avgScore: -1 } },
            { $limit: 10 }
        ]);

        const formattedTrending = trending.map(t => ({
            topic: t._id,
            activityCount: t.count,
            label: 'Trending'
        }));

        res.status(200).json({ trending: formattedTrending });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch trending topics' });
    }
};

export const toggleLikePost = async (req: AuthRequest, res: Response) => {
    try {
        const { postId } = req.params;
        const userId = req.user?.user_id;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const hasLiked = post.upvotes.map(id => id.toString()).includes(user._id.toString());

        if (hasLiked) {
            post.upvotes = post.upvotes.filter(id => id.toString() !== user._id.toString());
            post.score = Math.max(0, post.score - 10);
            await post.save();
            return res.status(200).json({ post, hasLiked: false });
        } else {
            post.upvotes.push(user._id as any);
            post.score += 10;
            await post.save();
            return res.status(200).json({ post, hasLiked: true });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to toggle like' });
    }
};

export const addComment = async (req: AuthRequest, res: Response) => {
    try {
        const { postId } = req.params;
        const { text, parentId } = req.body;
        const authorId = req.user?.user_id;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        const user = await User.findById(authorId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // --- AI MODERATION CHECK ---
        const safetyResult = await checkContentSafety(text);
        if (safetyResult.flagged) {
            console.warn("Comment content flagged as unsafe:", safetyResult.reason);
            return res.status(403).json({
                error: 'Content Safety Violation',
                code: 'SAFETY_VIOLATION',
                reason: safetyResult.reason
            });
        }

        const comment = new Comment({
            postId,
            authorId: user._id,
            content: text,
            replyTo: parentId || null
        });

        await comment.save();

        post.commentCount += 1;
        post.score += 5; // Interaction score
        await post.save();

        const populatedComment = await comment.populate('authorId', 'name avatarUrl');

        res.status(201).json({ comment: populatedComment });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add comment' });
    }
};

export const editComment = async (req: AuthRequest, res: Response) => {
    try {
        const { commentId } = req.params;
        const { text } = req.body;
        const userId = req.user?.user_id;

        const comment = await Comment.findById(commentId);
        if (!comment) return res.status(404).json({ error: 'Comment not found' });

        if (comment.authorId.toString() !== userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        comment.content = text;
        comment.isEdited = true;
        await comment.save();

        const populatedComment = await comment.populate('authorId', 'name avatarUrl');

        res.status(200).json({ comment: populatedComment });
    } catch (error) {
        res.status(500).json({ error: 'Failed to edit comment' });
    }
};

export const translateFeedItem = async (req: Request, res: Response) => {
    try {
        const { texts, targetLang } = req.body;
        if (!texts || !Array.isArray(texts) || !targetLang) {
            return res.status(400).json({ error: 'Texts array and targetLang are required.' });
        }

        const translated = await translateText(texts, targetLang);
        res.status(200).json({ translatedText: translated });
    } catch (error: any) {
        console.error("Translation Controller Error:", error.message);
        res.status(500).json({ error: 'Translation failed' });
    }
};

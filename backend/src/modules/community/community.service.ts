import { prisma } from '../../lib/prisma';

/**
 * CommunityService
 * Handles all business logic for the community feed:
 * posts, comments, and up/downvoting.
 */
export class CommunityService {
  // ─── POSTS ──────────────────────────────────────────────────────────────────

  async getFeed(query: {
    category?: string;
    search?: string;
    limit?: number;
    offset?: number;
    userId?: string; // to inject userVote status
  }) {
    const where: any = { isDeleted: false };

    if (query.category && query.category !== 'general') {
      where.category = query.category as any;
    }

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { content: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const posts = await prisma.communityPost.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
            role: true,
          },
        },
        votes: query.userId
          ? { where: { userId: query.userId }, select: { value: true } }
          : false,
        _count: { select: { comments: true } },
      },
      orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
      take: query.limit || 30,
      skip: query.offset || 0,
    });

    return posts.map((post: any) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl,
      category: post.category,
      tags: post.tags,
      isQuestion: post.isQuestion,
      isAnonymous: post.isAnonymous,
      isPinned: post.isPinned,
      likeCount: post.likeCount,
      dislikeCount: post.dislikeCount,
      commentCount: post.commentCount,
      createdAt: post.createdAt,
      author: post.isAnonymous
        ? { fullName: 'Anonymous', avatarUrl: null, role: 'student' }
        : post.author,
      userVote: query.userId && post.votes?.length > 0 ? post.votes[0].value : null,
    }));
  }

  async createPost(authorId: string, data: {
    title: string;
    content?: string;
    imageUrl?: string;
    category?: string;
    tags?: string[];
    isQuestion?: boolean;
    isAnonymous?: boolean;
  }) {
    const post = await prisma.communityPost.create({
      data: {
        authorId,
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl,
        category: (data.category as any) || 'general',
        tags: data.tags || [],
        isQuestion: data.isQuestion || false,
        isAnonymous: data.isAnonymous || false,
      },
      include: {
        author: { select: { id: true, fullName: true, avatarUrl: true, role: true } },
      },
    });
    
    // Mask author info if the post was made anonymously
    if (post.isAnonymous) {
      return {
        ...post,
        author: { id: authorId, fullName: 'Anonymous', avatarUrl: null, role: 'student' }
      };
    }
    
    return post;
  }

  async deletePost(postId: string, userId: string) {
    const post = await prisma.communityPost.findUnique({ where: { id: postId } });
    if (!post) throw new Error('Post not found');
    if (post.authorId !== userId) throw new Error('Unauthorized');

    return await prisma.communityPost.update({
      where: { id: postId },
      data: { isDeleted: true },
    });
  }

  // ─── VOTES ───────────────────────────────────────────────────────────────────

  async togglePostVote(userId: string, postId: string, value: 'like' | 'dislike') {
    return await prisma.$transaction(async (tx) => {
      const existing = await tx.communityVote.findUnique({
        where: { userId_postId: { userId, postId } },
      });

      if (existing) {
        if (existing.value === value) {
          // Same vote → remove it
          await tx.communityVote.delete({ where: { id: existing.id } });
          await tx.communityPost.update({
            where: { id: postId },
            data: {
              [value === 'like' ? 'likeCount' : 'dislikeCount']: { decrement: 1 }
            },
          });
          return { action: 'removed', value: null };
        } else {
          // Opposite vote → flip it
          await tx.communityVote.update({
            where: { id: existing.id },
            data: { value: value as any },
          });
          await tx.communityPost.update({
            where: { id: postId },
            data: {
              [value === 'like' ? 'likeCount' : 'dislikeCount']: { increment: 1 },
              [existing.value === 'like' ? 'likeCount' : 'dislikeCount']: { decrement: 1 }
            },
          });
          return { action: 'flipped', value };
        }
      }

      // New vote
      await tx.communityVote.create({
        data: { userId, postId, value: value as any },
      });
      await tx.communityPost.update({
        where: { id: postId },
        data: {
          [value === 'like' ? 'likeCount' : 'dislikeCount']: { increment: 1 }
        },
      });
      return { action: 'added', value };
    });
  }

  async toggleCommentVote(userId: string, commentId: string, value: 'like' | 'dislike') {
    return await prisma.$transaction(async (tx) => {
      const existing = await tx.communityVote.findUnique({
        where: { userId_commentId: { userId, commentId } },
      });

      if (existing) {
        if (existing.value === value) {
          await tx.communityVote.delete({ where: { id: existing.id } });
          await tx.communityComment.update({
            where: { id: commentId },
            data: {
              [value === 'like' ? 'likeCount' : 'dislikeCount']: { decrement: 1 }
            },
          });
          return { action: 'removed', value: null };
        } else {
          await tx.communityVote.update({
            where: { id: existing.id },
            data: { value: value as any },
          });
          await tx.communityComment.update({
            where: { id: commentId },
            data: {
              [value === 'like' ? 'likeCount' : 'dislikeCount']: { increment: 1 },
              [existing.value === 'like' ? 'likeCount' : 'dislikeCount']: { decrement: 1 }
            },
          });
          return { action: 'flipped', value };
        }
      }

      await tx.communityVote.create({
        data: { userId, commentId, value: value as any },
      });
      await tx.communityComment.update({
        where: { id: commentId },
        data: {
          [value === 'like' ? 'likeCount' : 'dislikeCount']: { increment: 1 }
        },
      });
      return { action: 'added', value };
    });
  }

  // ─── COMMENTS ─────────────────────────────────────────────────────────────────

  async getComments(postId: string, userId?: string) {
    const comments = await prisma.communityComment.findMany({
      where: { postId, isDeleted: false, parentId: null }, // top-level only
      include: {
        author: { select: { id: true, fullName: true, avatarUrl: true, role: true } },
        votes: userId
          ? { where: { userId }, select: { value: true } }
          : false,
        replies: {
          where: { isDeleted: false },
          include: {
            author: { select: { id: true, fullName: true, avatarUrl: true, role: true } },
            votes: userId
              ? { where: { userId }, select: { value: true } }
              : false,
          },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: [{ isBest: 'desc' }, { likeCount: 'desc' }, { createdAt: 'asc' }],
    });

    const mapComment = (c: any) => ({
      id: c.id,
      text: c.text,
      isAnswer: c.isAnswer,
      isBest: c.isBest,
      likeCount: c.likeCount,
      dislikeCount: c.dislikeCount,
      createdAt: c.createdAt,
      author: c.author,
      userVote: userId && c.votes?.length > 0 ? c.votes[0].value : null,
      replies: (c.replies || []).map(mapComment),
    });

    return comments.map(mapComment);
  }

  async addComment(authorId: string, data: {
    postId: string;
    text: string;
    parentId?: string;
    isAnswer?: boolean;
  }) {
    // 1. Verify post exists
    const post = await prisma.communityPost.findUnique({
      where: { id: data.postId },
    });

    if (!post || post.isDeleted) {
      throw new Error('Post not found or deleted');
    }

    // 2. Create comment
    const comment = await prisma.communityComment.create({
      data: {
        authorId,
        postId: data.postId,
        text: data.text,
        parentId: data.parentId || null,
        isAnswer: data.isAnswer || false,
      },
      include: {
        author: { select: { id: true, fullName: true, avatarUrl: true, role: true } },
      },
    });

    // 3. Increment comment count on the post
    await prisma.communityPost.update({
      where: { id: data.postId },
      data: { commentCount: { increment: 1 } },
    });

    return comment;
  }

  async deleteComment(commentId: string, userId: string) {
    const comment = await prisma.communityComment.findUnique({ where: { id: commentId } });
    if (!comment) throw new Error('Comment not found');
    if (comment.authorId !== userId) throw new Error('Unauthorized');

    return await prisma.$transaction(async (tx) => {
      const updated = await tx.communityComment.update({
        where: { id: commentId },
        data: { isDeleted: true },
      });

      // Decrement comment count on the post
      await tx.communityPost.update({
        where: { id: comment.postId },
        data: { commentCount: { decrement: 1 } },
      });

      return updated;
    });
  }
}

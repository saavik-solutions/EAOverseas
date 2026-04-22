import { prisma } from '../../lib/prisma';
import { Prisma } from '@prisma/client';

export class FeedService {
  async getAll(query: { category?: any; universityId?: string; limit?: number; userId?: string }) {
    const where: any = {
      status: 'published',
    };

    if (query.category) {
      where.category = query.category;
    }

    if (query.universityId && query.universityId !== 'all') {
      where.universityId = query.universityId;
    }

    const posts = await prisma.feedPost.findMany({
      where,
      include: {
        author: {
          select: {
            fullName: true,
            avatarUrl: true,
          }
        },
        university: {
          select: {
            id: true,
            name: true,
            slug: true,
            logoUrl: true,
          }
        },
        interactions: query.userId ? {
          where: { userId: query.userId },
          select: { type: true }
        } : false
      },
      orderBy: { createdAt: 'desc' },
      take: query.limit || 50,
    });

    if (!query.userId) return posts;

    return posts.map(post => {
      const { interactions, ...rest } = post as any;
      return {
        ...rest,
        userInteractions: interactions.map((i: any) => i.type)
      };
    });
  }

  async getBySlug(slug: string, userId?: string) {
    const post = await prisma.feedPost.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            fullName: true,
            avatarUrl: true,
          }
        },
        university: true,
        interactions: userId ? {
          where: { userId },
          select: { type: true }
        } : false
      }
    });

    if (!post || !userId) return post;

    const { interactions, ...rest } = post as any;
    return {
      ...rest,
      userInteractions: interactions.map((i: any) => i.type)
    };
  }

  async toggleInteraction(userId: string, postId: string, type: 'like' | 'bookmark') {
    // 1. If it's a bookmark, handle it independently
    if (type === 'bookmark') {
      const existing = await prisma.feedInteraction.findUnique({
        where: { userId_postId_type: { userId, postId, type: 'bookmark' } }
      });

      if (existing) {
        await prisma.feedInteraction.delete({ where: { id: existing.id } });
        await prisma.feedPost.update({
          where: { id: postId },
          data: { bookmarkCount: { decrement: 1 } }
        });
        return { action: 'removed', type: 'bookmark' };
      } else {
        await prisma.feedInteraction.create({
          data: { userId, postId, type: 'bookmark' }
        });
        await prisma.feedPost.update({
          where: { id: postId },
          data: { bookmarkCount: { increment: 1 } }
        });
        return { action: 'added', type: 'bookmark' };
      }
    }

    // 2. Handle only 'like' interaction (dislike removed)
    const existing = await prisma.feedInteraction.findUnique({
      where: { userId_postId_type: { userId, postId, type: 'like' } }
    });

    if (existing) {
      // Toggle off
      await prisma.feedInteraction.delete({ where: { id: existing.id } });
      await prisma.feedPost.update({
        where: { id: postId },
        data: { likeCount: { decrement: 1 } }
      });
      return { action: 'removed', type: 'like' };
    }

    // Direct add like
    await prisma.$transaction([
      prisma.feedInteraction.create({ data: { userId, postId, type: 'like' } }),
      prisma.feedPost.update({
        where: { id: postId },
        data: { likeCount: { increment: 1 } }
      })
    ]);
    
    return { action: 'added', type: 'like' };
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-') + '-' + Math.random().toString(36).substring(2, 7);
  }

  async create(data: any) {
    const { title, content, category, tags, authorId, universityId, ...rest } = data;
    
    // Validate universityId (UUID expectation)
    const validUniId = (universityId && universityId !== 'all') ? universityId : null;

    return await prisma.feedPost.create({
      data: {
        title,
        content,
        category: category as any,
        tags: tags || [],
        authorId,
        universityId: validUniId,
        slug: this.generateSlug(title),
        status: (data.status?.toLowerCase() as any) || 'published',
        publishedAt: data.status?.toLowerCase() === 'published' ? new Date() : null,
        metadata: rest || {},
      }
    });
  }
}

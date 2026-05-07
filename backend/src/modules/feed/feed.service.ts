import { prisma } from '../../lib/prisma';

export class FeedService {
<<<<<<< HEAD
  async getAll(query: { category?: any; universityId?: string; limit?: number; userId?: string; search?: string }) {
    const where: any = {
      status: 'published',
    };
=======
  async getAll(query: { category?: any; universityId?: string; limit?: number; userId?: string; status?: string }) {
    const where: any = {};
    
    if (query.status === 'all') {
      // No status filter applied
    } else if (query.status) {
      where.status = query.status;
    } else {
      where.status = 'published';
    }
    
    console.log('[FeedService] Prisma Where:', where);
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508

    if (query.category) {
      where.category = query.category;
    }

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { content: { contains: query.search, mode: 'insensitive' } },
      ];
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
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
    console.log(`[FeedService] getBySlug: slug=${slug}, isUuid=${isUuid}`);
    const post = await prisma.feedPost.findUnique({
      where: isUuid ? { id: slug } : { slug },
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
<<<<<<< HEAD
    const { title, content, category, tags, authorId, universityId, coverImageUrl, excerpt, ...rest } = data;
=======
    const { title, content, category, tags, authorId, universityId, coverImageUrl, ...rest } = data;
    
    // Map frontend types to DB enum
    const categoryMap: Record<string, string> = {
      'Article': 'articles',
      'Scholarship': 'scholarships',
      'Program': 'programs',
      'Announcement': 'announcements',
      'Event': 'events',
      'Guide': 'guides',
      'News': 'news',
      'Webinar': 'webinars',
      'Article ': 'articles' // handle trailing spaces if any
    };

    let mappedCategory = (categoryMap[category] || category || 'news').toLowerCase();
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508
    
    // Validate universityId (UUID expectation)
    const validUniId = (universityId && universityId !== 'all') ? universityId : null;

    return await prisma.feedPost.create({
      data: {
        title,
        content,
        category: mappedCategory as any,
        tags: tags || [],
        authorId,
        universityId: validUniId,
<<<<<<< HEAD
        coverImageUrl,
        excerpt,
=======
        coverImageUrl: coverImageUrl || null,
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508
        slug: this.generateSlug(title),
        status: (data.status?.toLowerCase() as any) || 'published',
        publishedAt: data.status?.toLowerCase() === 'published' ? new Date() : null,
        metadata: rest || {},
      }
    });
  }
<<<<<<< HEAD

  async update(id: string, data: any) {
    const { title, content, category, tags, universityId, coverImageUrl, excerpt, status, authorId, ...rest } = data;
    const updateData: any = {};
    if (title) { updateData.title = title; updateData.slug = this.generateSlug(title); }
    if (content) updateData.content = content;
    if (category) updateData.category = category as any;
    if (tags) updateData.tags = tags;
    if (universityId !== undefined) updateData.universityId = universityId === 'all' ? null : universityId;
    if (coverImageUrl !== undefined) updateData.coverImageUrl = coverImageUrl;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (status) updateData.status = status.toLowerCase() as any;
    
    // Store remaining attributes in metadata
    if (Object.keys(rest).length > 0) {
      updateData.metadata = rest;
    }

    return await prisma.feedPost.update({ where: { id }, data: updateData });
  }

  async delete(id: string) {
    return await prisma.feedPost.delete({ where: { id } });
=======
  async updateStatus(id: string, status: string) {
    console.log(`[FeedService] Updating post ${id} to status: ${status}`);
    const data: any = {
      status: status.toLowerCase() as any,
    };

    if (status.toLowerCase() === 'published') {
      data.publishedAt = new Date();
    }

    return await prisma.feedPost.update({
      where: { id },
      data
    });
  }
  async delete(id: string) {
    return await prisma.feedPost.delete({
      where: { id }
    });
  }
  async update(id: string, data: any) {
    const { title, content, category, tags, coverImageUrl, metadata, status } = data;
    
    const updateData: any = {
      title,
      content,
      tags,
      coverImageUrl,
      metadata: metadata || {},
    };

    if (category) {
      const categoryMap: Record<string, string> = {
        'Article': 'articles',
        'Scholarship': 'scholarships',
        'Program': 'programs',
        'Announcement': 'announcements',
        'Event': 'events',
        'Guide': 'guides',
        'News': 'news',
        'Webinar': 'webinars'
      };
      updateData.category = (categoryMap[category] || category).toLowerCase();
    }

    if (status) {
      updateData.status = status.toLowerCase();
      if (status.toLowerCase() === 'published') {
        updateData.publishedAt = new Date();
      }
    }

    return await prisma.feedPost.update({
      where: { id },
      data: updateData
    });
  }
  async addComment(userId: string, postId: string, content: string) {
    return await prisma.feedComment.create({
      data: {
        postId,
        content,
        authorId: userId
      },
      include: {
        author: {
          select: {
            fullName: true,
            avatarUrl: true
          }
        }
      }
    });
  }

  async getComments(postId: string) {
    return await prisma.feedComment.findMany({
      where: { postId },
      include: {
        author: {
          select: {
            fullName: true,
            avatarUrl: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508
  }
}

import { FastifyReply, FastifyRequest } from 'fastify';
import { FeedService } from './feed.service';

const feedService = new FeedService();

export const getAllPosts = async (request: FastifyRequest, reply: FastifyReply) => {
<<<<<<< HEAD
  const { category, limit, universityId, search } = request.query as any;
=======
  const { category, limit, universityId, status } = request.query as any;
  console.log('[FeedController] GET /api/feed Query:', request.query);
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508
  const user = (request as any).user;
  
  const posts = await feedService.getAll({ 
    category, 
    universityId,
    limit: Number(limit) || 20,
    userId: user?.id,
<<<<<<< HEAD
    search
=======
    status
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508
  });
  return posts;
};

export const updatePostStatus = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = (request as any).user;
  if (user?.role !== 'super_admin' && user?.role !== 'admin') {
    return reply.status(403).send({ error: 'Only admins can update post status' });
  }

  const { id } = request.params as { id: string };
  const { status } = request.body as { status: string };

  const post = await feedService.updateStatus(id, status);
  return post;
};

export const getPostBySlug = async (request: FastifyRequest, reply: FastifyReply) => {
  const { slug } = request.params as { slug: string };
  const user = (request as any).user;

  const post = await feedService.getBySlug(slug, user?.id);
  if (!post) {
    return reply.status(404).send({ error: 'Post not found' });
  }
  return post;
};

export const createPost = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = (request as any).user;
  if (!user) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }

  const body = request.body as any;
  
  // Only super_admin can publish directly
  if (body.status === 'published' && user.role !== 'super_admin') {
    body.status = 'pending';
  }

  const post = await feedService.create({
    ...body,
    authorId: user.id
  });
  return reply.status(201).send(post);
};

export const updatePost = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const user = (request as any).user;
  if (!user) return reply.status(401).send({ error: 'Unauthorized' });

  const post = await feedService.update(id, request.body as any);
  return reply.status(200).send(post);
};

export const deletePost = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const user = (request as any).user;
  if (!user) return reply.status(401).send({ error: 'Unauthorized' });

  await feedService.delete(id);
  return reply.status(200).send({ message: 'Post deleted successfully' });
};

export const toggleLike = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const user = (request as any).user;
  if (!user) return reply.status(401).send({ error: 'Unauthorized' });

  const result = await feedService.toggleInteraction(user.id, id, 'like');
  return result;
};


export const toggleBookmark = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const user = (request as any).user;
  if (!user) return reply.status(401).send({ error: 'Unauthorized' });

  const result = await feedService.toggleInteraction(user.id, id, 'bookmark');
  return result;
};

export const deletePost = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = (request as any).user;
  if (!user) return reply.status(401).send({ error: 'Unauthorized' });
  
  const { id } = request.params as { id: string };
  
  // Basic security: Check if post exists and if user is admin or author
  const post = await prisma.feedPost.findUnique({ where: { id } });
  if (!post) return reply.status(404).send({ error: 'Post not found' });
  
  if (user.role !== 'super_admin' && post.authorId !== user.id) {
    return reply.status(403).send({ error: 'Unauthorized to delete this post' });
  }

  await feedService.delete(id);
  return { success: true };
};

export const updatePost = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = (request as any).user;
  if (!user) return reply.status(401).send({ error: 'Unauthorized' });
  
  const { id } = request.params as { id: string };
  const data = request.body as any;
  
  const post = await prisma.feedPost.findUnique({ where: { id } });
  if (!post) return reply.status(404).send({ error: 'Post not found' });
  
  if (user.role !== 'super_admin' && post.authorId !== user.id) {
    return reply.status(403).send({ error: 'Unauthorized to update this post' });
  }

  const updated = await feedService.update(id, data);
  return updated;
};

export const addComment = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const { content } = request.body as { content: string };
  const user = (request as any).user;
  if (!user) return reply.status(401).send({ error: 'Unauthorized' });

  const comment = await feedService.addComment(user.id, id, content);
  return comment;
};

export const getComments = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const comments = await feedService.getComments(id);
  return comments;
};

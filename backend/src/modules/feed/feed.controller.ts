import { FastifyReply, FastifyRequest } from 'fastify';
import { FeedService } from './feed.service';

const feedService = new FeedService();

export const getAllPosts = async (request: FastifyRequest, reply: FastifyReply) => {
  const { category, limit, universityId } = request.query as any;
  const user = (request as any).user;
  
  const posts = await feedService.getAll({ 
    category, 
    universityId,
    limit: Number(limit) || 20,
    userId: user?.id
  });
  return posts;
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

  const post = await feedService.create({
    ...request.body as any,
    authorId: user.id
  });
  return reply.status(201).send(post);
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

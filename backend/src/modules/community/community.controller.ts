import { FastifyRequest, FastifyReply } from 'fastify';
import { CommunityService } from './community.service';

const service = new CommunityService();

/**
 * CommunityController
 * Thin handlers: extract params, call service, return response.
 */
export const CommunityController = {
  // GET /api/community/posts
  async getFeed(request: FastifyRequest, reply: FastifyReply) {
    const { category, search, limit, offset } = request.query as any;
    const userId = (request as any).user?.id;

    const posts = await service.getFeed({
      category,
      search,
      limit: limit ? parseInt(limit) : 30,
      offset: offset ? parseInt(offset) : 0,
      userId,
    });

    return reply.send(posts);
  },

  // POST /api/community/posts
  async createPost(request: FastifyRequest, reply: FastifyReply) {
    const userId = (request as any).user?.id;
    if (!userId) return reply.status(401).send({ error: 'Unauthorized' });

    const body = request.body as any;
    const post = await service.createPost(userId, body);
    return reply.status(201).send(post);
  },

  // DELETE /api/community/posts/:id
  async deletePost(request: FastifyRequest, reply: FastifyReply) {
    const userId = (request as any).user?.id;
    if (!userId) return reply.status(401).send({ error: 'Unauthorized' });

    const { id } = request.params as any;
    try {
      await service.deletePost(id, userId);
      return reply.send({ success: true });
    } catch (err: any) {
      return reply.status(403).send({ error: err.message });
    }
  },

  // POST /api/community/posts/:id/vote
  async votePost(request: FastifyRequest, reply: FastifyReply) {
    const userId = (request as any).user?.id;
    if (!userId) return reply.status(401).send({ error: 'Unauthorized' });

    const { id } = request.params as any;
    const { value } = request.body as any;

    if (!['like', 'dislike'].includes(value)) {
      return reply.status(400).send({ error: 'value must be "like" or "dislike"' });
    }

    const result = await service.togglePostVote(userId, id, value);
    return reply.send(result);
  },

  // GET /api/community/posts/:id/comments
  async getComments(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as any;
    const userId = (request as any).user?.id;
    const comments = await service.getComments(id, userId);
    return reply.send(comments);
  },

  // POST /api/community/comments
  async addComment(request: FastifyRequest, reply: FastifyReply) {
    const userId = (request as any).user?.id;
    if (!userId) return reply.status(401).send({ error: 'Unauthorized' });

    const body = request.body as any;
    const comment = await service.addComment(userId, body);
    return reply.status(201).send(comment);
  },

  // POST /api/community/comments/:id/vote
  async voteComment(request: FastifyRequest, reply: FastifyReply) {
    const userId = (request as any).user?.id;
    if (!userId) return reply.status(401).send({ error: 'Unauthorized' });

    const { id } = request.params as any;
    const { value } = request.body as any;

    if (!['like', 'dislike'].includes(value)) {
      return reply.status(400).send({ error: 'value must be "like" or "dislike"' });
    }

    const result = await service.toggleCommentVote(userId, id, value);
    return reply.send(result);
  },

  // DELETE /api/community/comments/:id
  async deleteComment(request: FastifyRequest, reply: FastifyReply) {
    const userId = (request as any).user?.id;
    if (!userId) return reply.status(401).send({ error: 'Unauthorized' });

    const { id } = request.params as any;
    try {
      await service.deleteComment(id, userId);
      return reply.send({ success: true });
    } catch (err: any) {
      return reply.status(403).send({ error: err.message });
    }
  },
};

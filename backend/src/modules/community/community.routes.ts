import { FastifyInstance } from 'fastify';
import { CommunityController } from './community.controller';

/**
 * Community Routes
 * Public: GET posts/comments (optional auth for userVote injection)
 * Protected: POST/DELETE posts, voting, comments
 */
export async function communityRoutes(fastify: FastifyInstance) {
  // ── Public (with optional auth) ──────────────────────────────────────────────
  fastify.get('/posts', {
    preHandler: async (request) => {
      // Optional auth — don't fail if no token
      try { await (request as any).jwtVerify(); } catch { /* anonymous */ }
    },
    handler: CommunityController.getFeed,
  });

  fastify.get('/posts/:id/comments', {
    preHandler: async (request) => {
      try { await (request as any).jwtVerify(); } catch { /* anonymous */ }
    },
    handler: CommunityController.getComments,
  });

  // ── Protected ─────────────────────────────────────────────────────────────────
  fastify.post('/posts', {
    preHandler: [(request: any) => request.jwtVerify()],
    handler: CommunityController.createPost,
  });

  fastify.delete('/posts/:id', {
    preHandler: [(request: any) => request.jwtVerify()],
    handler: CommunityController.deletePost,
  });

  fastify.post('/posts/:id/vote', {
    preHandler: [(request: any) => request.jwtVerify()],
    handler: CommunityController.votePost,
  });

  fastify.post('/comments', {
    preHandler: [(request: any) => request.jwtVerify()],
    handler: CommunityController.addComment,
  });

  fastify.post('/comments/:id/vote', {
    preHandler: [(request: any) => request.jwtVerify()],
    handler: CommunityController.voteComment,
  });

  fastify.delete('/comments/:id', {
    preHandler: [(request: any) => request.jwtVerify()],
    handler: CommunityController.deleteComment,
  });
}

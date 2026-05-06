import { FastifyInstance, FastifyRequest } from 'fastify';
import { getAllPosts, getPostBySlug, createPost, updatePost, deletePost, toggleLike, toggleBookmark } from './feed.controller';

export default async function feedRoutes(app: FastifyInstance) {
  // GET posts - optional auth to show user heart/upvote state
  app.get('/', {
    preHandler: [async (request: FastifyRequest) => {
        try { await request.jwtVerify(); } catch (e) {}
    }]
  }, getAllPosts);

  app.get('/:slug', {
    preHandler: [async (request: FastifyRequest) => {
        try { await request.jwtVerify(); } catch (e) {}
    }]
  }, getPostBySlug);
  
  app.post('/', {
    preHandler: [async (request: FastifyRequest) => await request.jwtVerify()]
  }, createPost);

  app.put('/:id', {
    preHandler: [async (request: FastifyRequest) => await request.jwtVerify()]
  }, updatePost);

  app.delete('/:id', {
    preHandler: [async (request: FastifyRequest) => await request.jwtVerify()]
  }, deletePost);

  // Interactions
  app.post('/:id/like', {
    preHandler: [async (request: FastifyRequest) => await request.jwtVerify()]
  }, toggleLike);


  app.post('/:id/bookmark', {
    preHandler: [async (request: FastifyRequest) => await request.jwtVerify()]
  }, toggleBookmark);
}

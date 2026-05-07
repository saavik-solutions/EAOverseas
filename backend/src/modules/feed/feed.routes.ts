import { FastifyInstance, FastifyRequest } from 'fastify';
import { getAllPosts, getPostBySlug, createPost, toggleLike, toggleBookmark, updatePostStatus, deletePost, updatePost, addComment, getComments } from './feed.controller';

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

  // Interactions
  app.post('/:id/like', {
    preHandler: [async (request: FastifyRequest) => await request.jwtVerify()]
  }, toggleLike);


  app.post('/:id/bookmark', {
    preHandler: [async (request: FastifyRequest) => await request.jwtVerify()]
  }, toggleBookmark);

  app.patch('/:id/status', {
    preHandler: [async (request: FastifyRequest) => await request.jwtVerify()]
  }, updatePostStatus);
  
  app.delete('/:id', {
    preHandler: [async (request: FastifyRequest) => await request.jwtVerify()]
  }, deletePost);

  app.put('/:id', {
    preHandler: [async (request: FastifyRequest) => await request.jwtVerify()]
  }, updatePost);

  // Comments
  app.get('/:id/comments', getComments);
  app.post('/:id/comments', {
    preHandler: [async (request: FastifyRequest) => await request.jwtVerify()]
  }, addComment);
}

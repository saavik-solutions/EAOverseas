import fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import multipart from '@fastify/multipart';
import cookie from '@fastify/cookie';
import { prisma } from './lib/prisma';
import { connectMongoDB } from './lib/mongodb';
import universityRoutes from './modules/universities/universities.routes';
import authRoutes from './modules/auth/auth.routes';
import feedRoutes from './modules/feed/feed.routes';
import scraperRoutes from './modules/scraper/scraper.routes';
import uploadRoutes from './modules/upload/upload.routes';
import { communityRoutes } from './modules/community/community.routes';
import path from 'path';
import fastifyStatic from '@fastify/static';
import fastifySocketIO from 'fastify-socket.io';
import adminRoutes from './modules/admin/admin.routes';
import chatRoutes from './modules/chat/chat.routes';
import { registerChatSocket } from './modules/chat/chat.socket';

const app: FastifyInstance = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  },
});

export const buildApp = async () => {
  // --- Connect Databases ---
  await connectMongoDB();

  // --- Global Plugins ---
  
  // CORS configuration for Vite frontend
  await app.register(cors, {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });

  // JWT configuration
  await app.register(jwt, {
    secret: process.env.JWT_SECRET || 'ea_overseas_secure_secret_2026',
    cookie: {
      cookieName: 'refreshToken',
      signed: false,
    },
  });

  // Cookie support
  await app.register(cookie);

  // Multipart/File upload support
  await app.register(multipart, {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  });

  // Static file serving
  await app.register(fastifyStatic, {
    root: path.join(process.cwd(), 'uploads'),
    prefix: '/uploads/',
  });

  // Socket.io initialization
  await app.register(fastifySocketIO, {
    cors: {
      origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:3000'],
      methods: ['GET', 'POST'],
    },
  });

  // --- Health Check ---
  app.get('/api/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  // --- Modular Route Registration ---
  await app.register(universityRoutes, { prefix: '/api/universities' });
  await app.register(authRoutes, { prefix: '/api/auth' });
  await app.register(feedRoutes, { prefix: '/api/feed' });
  await app.register(scraperRoutes, { prefix: '/api/scraper' });
  await app.register(chatRoutes, { prefix: '/api/chat' });
  await app.register(uploadRoutes, { prefix: '/api/upload' });
  await app.register(communityRoutes, { prefix: '/api/community' });
  await app.register(adminRoutes, { prefix: '/api/admin' });
  
  app.decorate('prisma', prisma);

  // Register Socket Handlers
  registerChatSocket(app);

  return app;
};

export default app;

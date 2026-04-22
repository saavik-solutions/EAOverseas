import fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import multipart from '@fastify/multipart';
import cookie from '@fastify/cookie';
import { prisma } from './lib/prisma';
import universityRoutes from './modules/universities/universities.routes';
import authRoutes from './modules/auth/auth.routes';
import feedRoutes from './modules/feed/feed.routes';
import uploadRoutes from './modules/upload/upload.routes';
import { communityRoutes } from './modules/community/community.routes';
import path from 'path';
import fastifyStatic from '@fastify/static';
import adminRoutes from './modules/admin/admin.routes';

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
  // --- Global Plugins ---
  
  // CORS configuration for Vite frontend
  await app.register(cors, {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
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

  // --- Health Check ---
  app.get('/api/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  // --- Modular Route Registration ---
  await app.register(universityRoutes, { prefix: '/api/universities' });
  await app.register(authRoutes, { prefix: '/api/auth' });
  await app.register(feedRoutes, { prefix: '/api/feed' });
  await app.register(uploadRoutes, { prefix: '/api/upload' });
  await app.register(communityRoutes, { prefix: '/api/community' });
  await app.register(adminRoutes, { prefix: '/api/admin' });
  
  app.decorate('prisma', prisma);

  return app;
};

export default app;

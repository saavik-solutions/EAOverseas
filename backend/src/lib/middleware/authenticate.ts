import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma'; // Base prisma client
import { Role } from '@prisma/client';

export interface AuthUser {
  id: string;
  email: string;
  role: Role;
  isServiceAccount: boolean;
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: AuthUser;
  }
}

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  const authHeader = request.headers.authorization;
  const apiKeyHeader = request.headers['x-api-key'];

  // 1. Try API Key Strategy (S2S)
  if (apiKeyHeader && typeof apiKeyHeader === 'string') {
    const apiKey = await prisma.apiKey.findFirst({
      where: {
        keyHash: apiKeyHeader, // In production, this would be a constant-time hash comparison
        isActive: true,
      },
      include: { owner: true }
    });

    if (apiKey) {
      request.user = {
        id: apiKey.ownerId || apiKey.id,
        email: apiKey.owner?.email || 'service-account@eaoverseas.com',
        role: apiKey.role as Role,
        isServiceAccount: true,
      };

      // Update last used
      await prisma.apiKey.update({
        where: { id: apiKey.id },
        data: { lastUsedAt: new Date() }
      });
      
      return;
    }
  }

  // 2. Try JWT Strategy (User Session)
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret') as any;
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.sub || decoded.id }
      });

      if (user && user.isActive) {
        request.user = {
          id: user.id,
          email: user.email,
          role: user.role as Role,
          isServiceAccount: false,
        };
        return;
      }
    } catch (err) {
      // Token expired or invalid, continue to 401
    }
  }

  // 3. Fallback: Unauthorized
  return reply.status(401).send({
    error: 'Unauthorized',
    message: 'Authentication required via Bearer token or x-api-key'
  });
};

/**
 * Higher-order function to restrict routes by role
 */
export const authorize = (roles: Role[]) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.user) {
      return reply.status(401).send({ error: 'Unauthorized' });
    }

    if (!roles.includes(request.user.role)) {
      return reply.status(403).send({
        error: 'Forbidden',
        message: 'You do not have permission to access this resource'
      });
    }
  };
};

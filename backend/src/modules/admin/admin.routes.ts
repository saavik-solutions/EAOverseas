import { FastifyInstance } from 'fastify';
import { getAllUsers, createUserAdmin, toggleUserStatus } from './admin.controller';
import { authenticate, authorize } from '../../lib/middleware/authenticate';
import { Role } from '../../lib/prisma';

export default async function adminRoutes(app: FastifyInstance) {
  // Guard all admin routes with authentication and role checking
  app.addHook('preHandler', authenticate);
  app.addHook('preHandler', authorize([Role.super_admin, Role.admin]));

  // User Management
  app.get('/users', getAllUsers);
  app.post('/users', createUserAdmin);
  app.patch('/users/:id/status', toggleUserStatus);
}

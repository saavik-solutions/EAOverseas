import { FastifyInstance } from 'fastify';
import {
  getAllUniversities,
  getUniversityByIdOrSlug,
  createUniversity,
  updateUniversity,
  deleteUniversity,
} from './universities.controller';

import { authenticate, authorize } from '../../lib/middleware/authenticate';
import { Role } from '../../lib/prisma';

export default async function universityRoutes(app: FastifyInstance) {
  app.get('/', getAllUniversities);
  app.get('/:id', getUniversityByIdOrSlug);
  
  // Protected Routes - Only Admin/SuperAdmin can modify university data
  app.post('/', { preHandler: [authenticate, authorize(['admin' as Role, 'super_admin' as Role])] }, createUniversity);
  app.put('/:id', { preHandler: [authenticate, authorize(['admin' as Role, 'super_admin' as Role])] }, updateUniversity);
  app.delete('/:id', { preHandler: [authenticate, authorize(['admin' as Role, 'super_admin' as Role])] }, deleteUniversity);
}

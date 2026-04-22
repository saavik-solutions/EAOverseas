import { FastifyInstance } from 'fastify';
import { uploadFile } from './upload.controller';

export default async function uploadRoutes(app: FastifyInstance) {
  app.post('/image', uploadFile);
}

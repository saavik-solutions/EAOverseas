import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { startScraper, getScrapedUniversities, getJobStatus } from './scraper.controller';
import { authenticate } from '../../shared/middleware/authenticate';

export default async function scraperRoutes(app: FastifyInstance) {
  app.post('/start', { preHandler: [authenticate] }, startScraper);
  app.get('/status/:jobId', { preHandler: [authenticate] }, getJobStatus);
  app.get('/universities', getScrapedUniversities);
}

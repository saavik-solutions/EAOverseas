import { Router } from 'express';
import { startScraper, getScrapedUniversities, getJobStatus } from '../controllers/scraper.controller';
import { verifyJWT, requireRole } from '../middleware/verifyJWT';

const router = Router();

router.post('/start', verifyJWT, requireRole('admin', 'superadmin'), startScraper);
router.get('/status/:jobId', verifyJWT, requireRole('admin', 'superadmin'), getJobStatus);
router.get('/universities', getScrapedUniversities);

export default router;

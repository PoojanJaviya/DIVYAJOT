import { Router } from 'express';
import { getAllReports, downloadReport, createReport } from '../controllers/report.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.get('/',           getAllReports);
router.get('/:id/download', downloadReport);
router.post('/',          authenticate, requireRole('SUPER_ADMIN','ADMIN'), createReport);

export default router;

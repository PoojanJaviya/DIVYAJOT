import { Router } from 'express';
import { getDashboardStats } from '../controllers/admin.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.get('/stats', authenticate, requireRole('SUPER_ADMIN','ADMIN'), getDashboardStats);

export default router;

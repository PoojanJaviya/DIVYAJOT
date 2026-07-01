import { Router } from 'express';
import { getAllCauses, getCauseBySlug, createCause, updateCause } from '../controllers/cause.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.get('/',         getAllCauses);
router.get('/:slug',    getCauseBySlug);
router.post('/',        authenticate, requireRole('SUPER_ADMIN','ADMIN'), createCause);
router.put('/:id',      authenticate, requireRole('SUPER_ADMIN','ADMIN'), updateCause);

export default router;

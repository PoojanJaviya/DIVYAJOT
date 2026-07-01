import { Router } from 'express';
import {
  registerVolunteer,
  getAllVolunteers,
  getVolunteerById,
  approveVolunteer,
  rejectVolunteer,
} from '../controllers/volunteer.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router = Router();

// Public
router.post('/register', registerVolunteer);

// Admin only
router.get('/',                  authenticate, requireRole('SUPER_ADMIN','ADMIN','VOLUNTEER_COORDINATOR'), getAllVolunteers);
router.get('/:id',               authenticate, requireRole('SUPER_ADMIN','ADMIN','VOLUNTEER_COORDINATOR'), getVolunteerById);
router.patch('/:id/approve',     authenticate, requireRole('SUPER_ADMIN','ADMIN','VOLUNTEER_COORDINATOR'), approveVolunteer);
router.patch('/:id/reject',      authenticate, requireRole('SUPER_ADMIN','ADMIN','VOLUNTEER_COORDINATOR'), rejectVolunteer);

export default router;

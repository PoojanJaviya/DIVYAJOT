import { Router } from 'express';
import {
  getAllEvents,
  getEventBySlug,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/event.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.get('/',          getAllEvents);
router.get('/:slug',     getEventBySlug);
router.post('/',         authenticate, requireRole('SUPER_ADMIN','ADMIN','EDITOR'), createEvent);
router.put('/:id',       authenticate, requireRole('SUPER_ADMIN','ADMIN','EDITOR'), updateEvent);
router.delete('/:id',    authenticate, requireRole('SUPER_ADMIN','ADMIN'),          deleteEvent);

export default router;

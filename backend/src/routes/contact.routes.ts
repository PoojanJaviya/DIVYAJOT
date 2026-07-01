import { Router } from 'express';
import {
  createContact,
  getAllContacts,
  updateContactStatus,
} from '../controllers/contact.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';
import rateLimit from 'express-rate-limit';

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { success: false, message: 'Too many contact requests. Please try again later.' },
});

const router = Router();

router.post('/',         contactLimiter, createContact);
router.get('/',          authenticate, requireRole('SUPER_ADMIN','ADMIN'), getAllContacts);
router.patch('/:id/status', authenticate, requireRole('SUPER_ADMIN','ADMIN'), updateContactStatus);

export default router;

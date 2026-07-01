import { Router } from 'express';
import {
  createOrder,
  verifyPayment,
  getAllDonations,
  getMyDonations,
} from '../controllers/donation.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router = Router();

// Public
router.post('/create-order', createOrder);
router.post('/verify',       verifyPayment);

// Protected
router.get('/my',  authenticate, getMyDonations);
router.get('/',    authenticate, requireRole('SUPER_ADMIN','ADMIN'), getAllDonations);

export default router;

import { Router } from 'express';
import { subscribe, unsubscribe } from '../controllers/newsletter.controller';
import rateLimit from 'express-rate-limit';

const newsletterLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});

const router = Router();

router.post('/subscribe',   newsletterLimiter, subscribe);
router.post('/unsubscribe', unsubscribe);

export default router;

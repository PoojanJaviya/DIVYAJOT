import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import authRoutes       from './routes/auth.routes';
import donationRoutes   from './routes/donation.routes';
import volunteerRoutes  from './routes/volunteer.routes';
import eventRoutes      from './routes/event.routes';
import galleryRoutes    from './routes/gallery.routes';
import blogRoutes       from './routes/blog.routes';
import contactRoutes    from './routes/contact.routes';
import causeRoutes      from './routes/cause.routes';
import reportRoutes     from './routes/report.routes';
import newsletterRoutes from './routes/newsletter.routes';
import adminRoutes      from './routes/admin.routes';

const app = express();

// ── Security ──────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
}));

// ── Rate limiting ─────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many auth attempts. Please try again later.' },
});

app.use(globalLimiter);

// ── Body parsing ──────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(compression());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ── Health check ──────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'DIVYAJOT API' });
});

// ── API Routes ────────────────────────────────────────────
app.use('/api/auth',       authLimiter, authRoutes);
app.use('/api/donations',  donationRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/events',     eventRoutes);
app.use('/api/gallery',    galleryRoutes);
app.use('/api/blogs',      blogRoutes);
app.use('/api/contact',    contactRoutes);
app.use('/api/causes',     causeRoutes);
app.use('/api/reports',    reportRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/admin',      adminRoutes);

// ── 404 handler ───────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Global error handler ──────────────────────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  });
});

export default app;

import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';
import { sendError } from '../utils/response';

export const validate = (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map(e => ({
        field:   e.path.join('.'),
        message: e.message,
      }));
      sendError(res, 'Validation failed', 422, errors);
      return;
    }
    req.body = result.data;
    next();
  };

// ── Schemas ────────────────────────────────────────────────

export const registerSchema = z.object({
  name:     z.string().min(2).max(100),
  email:    z.string().email(),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
  phone:    z.string().max(15).optional(),
});

export const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
});

export const donationSchema = z.object({
  amount:      z.number().positive().min(1),
  frequency:   z.enum(['ONE_TIME','MONTHLY','QUARTERLY','ANNUALLY']).default('ONE_TIME'),
  donorName:   z.string().min(2).max(100),
  donorEmail:  z.string().email(),
  donorPhone:  z.string().max(15).optional(),
  cause:       z.string().max(100).optional(),
  message:     z.string().max(500).optional(),
});

export const volunteerSchema = z.object({
  fullName:     z.string().min(2).max(100),
  email:        z.string().email(),
  phone:        z.string().min(10).max(15),
  city:         z.string().min(2).max(100),
  skills:       z.string().min(2),
  interests:    z.array(z.string()).min(1),
  availability: z.string().min(1),
  bio:          z.string().max(500).optional(),
});

export const contactSchema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email(),
  phone:   z.string().max(15).optional(),
  subject: z.string().max(255).optional(),
  message: z.string().min(10).max(2000),
});

export const blogSchema = z.object({
  title:      z.string().min(5).max(255),
  slug:       z.string().min(3).max(255),
  content:    z.string().min(10),
  excerpt:    z.string().max(500).optional(),
  category:   z.string().max(100).optional(),
  status:     z.enum(['DRAFT','PUBLISHED','ARCHIVED']).default('DRAFT'),
  metaTitle:  z.string().max(255).optional(),
  metaDesc:   z.string().max(500).optional(),
});

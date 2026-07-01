import { Response } from 'express';

export const sendSuccess = (
  res: Response,
  data: Record<string, unknown> = {},
  message = 'Success',
  statusCode = 200
) => res.status(statusCode).json({ success: true, message, ...data });

export const sendError = (
  res: Response,
  message = 'An error occurred',
  statusCode = 500,
  errors?: unknown
) => res.status(statusCode).json({ success: false, message, ...(errors ? { errors } : {}) });

export const sendPaginated = (
  res: Response,
  data: unknown[],
  total: number,
  page: number,
  limit: number,
  key = 'data'
) => res.json({
  success: true,
  [key]: data,
  pagination: {
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1,
  },
});

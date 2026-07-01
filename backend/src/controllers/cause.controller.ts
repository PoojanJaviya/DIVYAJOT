import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { sendSuccess, sendError } from '../utils/response';

export const getAllCauses = async (_req: Request, res: Response): Promise<void> => {
  try {
    const causes = await prisma.cause.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    sendSuccess(res, { causes });
  } catch {
    sendError(res, 'Failed to fetch causes', 500);
  }
};

export const getCauseBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const cause = await prisma.cause.findUnique({ where: { slug: req.params.slug } });
    if (!cause) { sendError(res, 'Cause not found', 404); return; }
    sendSuccess(res, { cause });
  } catch {
    sendError(res, 'Failed to fetch cause', 500);
  }
};

export const createCause = async (req: Request, res: Response): Promise<void> => {
  try {
    const cause = await prisma.cause.create({ data: req.body });
    sendSuccess(res, { cause }, 'Cause created', 201);
  } catch {
    sendError(res, 'Failed to create cause', 500);
  }
};

export const updateCause = async (req: Request, res: Response): Promise<void> => {
  try {
    const cause = await prisma.cause.update({ where: { id: req.params.id }, data: req.body });
    sendSuccess(res, { cause }, 'Cause updated');
  } catch {
    sendError(res, 'Failed to update cause', 500);
  }
};

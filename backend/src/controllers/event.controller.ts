import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';

export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const page     = parseInt(req.query.page     as string) || 1;
    const limit    = parseInt(req.query.limit    as string) || 12;
    const category = req.query.category as string | undefined;
    const status   = req.query.status   as string | undefined;
    const skip     = (page - 1) * limit;

    const where: Record<string, unknown> = { isPublished: true };
    if (category) where.category = category;
    if (status)   where.status   = status;

    const [events, total] = await Promise.all([
      prisma.event.findMany({ where, skip, take: limit, orderBy: { startDate: 'desc' } }),
      prisma.event.count({ where }),
    ]);

    sendPaginated(res, events, total, page, limit, 'events');
  } catch {
    sendError(res, 'Failed to fetch events', 500);
  }
};

export const getEventBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await prisma.event.findUnique({ where: { slug: req.params.slug } });
    if (!event) { sendError(res, 'Event not found', 404); return; }
    sendSuccess(res, { event });
  } catch {
    sendError(res, 'Failed to fetch event', 500);
  }
};

export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await prisma.event.create({ data: req.body });
    sendSuccess(res, { event }, 'Event created successfully', 201);
  } catch {
    sendError(res, 'Failed to create event', 500);
  }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await prisma.event.update({ where: { id: req.params.id }, data: req.body });
    sendSuccess(res, { event }, 'Event updated successfully');
  } catch {
    sendError(res, 'Failed to update event', 500);
  }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.event.delete({ where: { id: req.params.id } });
    sendSuccess(res, {}, 'Event deleted successfully');
  } catch {
    sendError(res, 'Failed to delete event', 500);
  }
};

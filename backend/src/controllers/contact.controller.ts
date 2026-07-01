import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { emailService } from '../services/email.service';

export const createContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const contact = await prisma.contactMessage.create({
      data: { name, email, phone, subject, message },
    });

    // Notify admin
    await emailService.sendContactNotification({ name, email, subject, message });
    // Auto-reply to sender
    await emailService.sendContactAutoReply({ name, email });

    sendSuccess(res, { contact }, 'Message sent successfully! We will reply within 24 hours.', 201);
  } catch {
    sendError(res, 'Failed to send message', 500);
  }
};

export const getAllContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const page   = parseInt(req.query.page  as string) || 1;
    const limit  = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string | undefined;
    const skip   = (page - 1) * limit;

    const where = status ? { status: status as 'NEW' | 'IN_PROGRESS' | 'RESOLVED' | 'SPAM' } : {};

    const [messages, total] = await Promise.all([
      prisma.contactMessage.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      prisma.contactMessage.count({ where }),
    ]);

    sendPaginated(res, messages, total, page, limit, 'messages');
  } catch {
    sendError(res, 'Failed to fetch contacts', 500);
  }
};

export const updateContactStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, notes } = req.body;
    const contact = await prisma.contactMessage.update({
      where: { id: req.params.id },
      data: {
        status,
        notes,
        repliedAt: status === 'RESOLVED' ? new Date() : undefined,
      },
    });
    sendSuccess(res, { contact }, 'Status updated');
  } catch {
    sendError(res, 'Failed to update status', 500);
  }
};

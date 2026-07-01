import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { sendSuccess, sendError } from '../utils/response';

export const subscribe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name } = req.body;
    if (!email) { sendError(res, 'Email is required', 400); return; }

    const subscriber = await prisma.newsletterSubscriber.upsert({
      where:  { email },
      update: { isActive: true, name },
      create: { email, name, source: req.body.source || 'website' },
    });

    sendSuccess(res, { subscriber }, 'Subscribed successfully! Welcome to our community.', 201);
  } catch {
    sendError(res, 'Subscription failed', 500);
  }
};

export const unsubscribe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    await prisma.newsletterSubscriber.update({
      where: { email },
      data:  { isActive: false, unsubscribedAt: new Date() },
    });
    sendSuccess(res, {}, 'Unsubscribed successfully');
  } catch {
    sendError(res, 'Unsubscribe failed', 500);
  }
};

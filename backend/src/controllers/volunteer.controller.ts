import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { emailService } from '../services/email.service';
import { AuthRequest } from '../middleware/auth.middleware';

export const registerVolunteer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, phone, city, skills, interests, availability, bio } = req.body;

    // Check if already registered
    const existing = await prisma.user.findUnique({ where: { email } });
    let userId: string;

    if (existing) {
      // Check if already a volunteer
      const vol = await prisma.volunteer.findUnique({ where: { userId: existing.id } });
      if (vol) { sendError(res, 'Already registered as a volunteer', 409); return; }
      userId = existing.id;
    } else {
      // Create basic user account
      const user = await prisma.user.create({
        data: { name: fullName, email, phone },
      });
      userId = user.id;
    }

    const volunteer = await prisma.volunteer.create({
      data: { userId, fullName, email, phone, city, skills, interests, availability, bio },
    });

    // Send confirmation email
    await emailService.sendVolunteerConfirmation({ fullName, email });

    sendSuccess(res, { volunteer }, 'Volunteer registration submitted! We will contact you within 48 hours.', 201);
  } catch (err) {
    console.error('Volunteer registration error:', err);
    sendError(res, 'Registration failed', 500);
  }
};

export const getAllVolunteers = async (req: Request, res: Response): Promise<void> => {
  try {
    const page   = parseInt(req.query.page  as string) || 1;
    const limit  = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string | undefined;
    const skip   = (page - 1) * limit;

    const where = status ? { status: status as 'PENDING' | 'APPROVED' | 'REJECTED' | 'INACTIVE' } : {};

    const [volunteers, total] = await Promise.all([
      prisma.volunteer.findMany({ where, skip, take: limit, orderBy: { joinedAt: 'desc' } }),
      prisma.volunteer.count({ where }),
    ]);

    sendPaginated(res, volunteers, total, page, limit, 'volunteers');
  } catch {
    sendError(res, 'Failed to fetch volunteers', 500);
  }
};

export const getVolunteerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const volunteer = await prisma.volunteer.findUnique({
      where: { id: req.params.id },
      include: { user: { select: { id: true, name: true, email: true, role: true } } },
    });
    if (!volunteer) { sendError(res, 'Volunteer not found', 404); return; }
    sendSuccess(res, { volunteer });
  } catch {
    sendError(res, 'Failed to fetch volunteer', 500);
  }
};

export const approveVolunteer = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const volunteer = await prisma.volunteer.update({
      where: { id: req.params.id },
      data: {
        status:     'APPROVED',
        approvedBy: req.user!.email,
        approvedAt: new Date(),
      },
    });
    await emailService.sendVolunteerApproval({ fullName: volunteer.fullName, email: volunteer.email });
    sendSuccess(res, { volunteer }, 'Volunteer approved successfully');
  } catch {
    sendError(res, 'Failed to approve volunteer', 500);
  }
};

export const rejectVolunteer = async (req: Request, res: Response): Promise<void> => {
  try {
    const volunteer = await prisma.volunteer.update({
      where: { id: req.params.id },
      data: { status: 'REJECTED' },
    });
    sendSuccess(res, { volunteer }, 'Volunteer rejected');
  } catch {
    sendError(res, 'Failed to reject volunteer', 500);
  }
};

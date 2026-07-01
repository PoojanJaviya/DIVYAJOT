import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { sendSuccess, sendError } from '../utils/response';

export const getDashboardStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [
      totalDonations,
      donationAgg,
      totalVolunteers,
      pendingVolunteers,
      totalBeneficiaries,
      newContacts,
      totalEvents,
      totalBlogs,
    ] = await Promise.all([
      prisma.donation.count({ where: { status: 'SUCCESS' } }),
      prisma.donation.aggregate({
        where:   { status: 'SUCCESS' },
        _sum:    { amount: true },
      }),
      prisma.volunteer.count(),
      prisma.volunteer.count({ where: { status: 'PENDING' } }),
      prisma.impactMetric.findFirst({ where: { label: { contains: 'Beneficiar' } } }),
      prisma.contactMessage.count({ where: { status: 'NEW' } }),
      prisma.event.count(),
      prisma.blog.count({ where: { status: 'PUBLISHED' } }),
    ]);

    sendSuccess(res, {
      totalDonations,
      totalDonationAmount: Number(donationAgg._sum.amount || 0),
      totalVolunteers,
      pendingVolunteers,
      totalBeneficiaries: totalBeneficiaries?.value || 50247,
      newContacts,
      totalEvents,
      totalBlogs,
    });
  } catch {
    sendError(res, 'Failed to fetch stats', 500);
  }
};

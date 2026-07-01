import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { sendSuccess, sendError } from '../utils/response';

export const getAllReports = async (req: Request, res: Response): Promise<void> => {
  try {
    const type = req.query.type as string | undefined;
    const where: Record<string, unknown> = { isPublic: true };
    if (type) where.type = type;

    const reports = await prisma.report.findMany({
      where,
      orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
    });
    sendSuccess(res, { reports });
  } catch {
    sendError(res, 'Failed to fetch reports', 500);
  }
};

export const downloadReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const report = await prisma.report.findUnique({ where: { id: req.params.id } });
    if (!report || !report.isPublic) { sendError(res, 'Report not found', 404); return; }

    await prisma.report.update({ where: { id: report.id }, data: { downloads: { increment: 1 } } });

    // Redirect to the actual file URL (Cloudinary / S3)
    res.redirect(report.fileUrl);
  } catch {
    sendError(res, 'Failed to download report', 500);
  }
};

export const createReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const report = await prisma.report.create({ data: req.body });
    sendSuccess(res, { report }, 'Report created', 201);
  } catch {
    sendError(res, 'Failed to create report', 500);
  }
};

import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { AuthRequest } from '../middleware/auth.middleware';

export const getAllBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const page     = parseInt(req.query.page     as string) || 1;
    const limit    = parseInt(req.query.limit    as string) || 9;
    const category = req.query.category as string | undefined;
    const skip     = (page - 1) * limit;

    const where: Record<string, unknown> = { status: 'PUBLISHED' };
    if (category) where.category = category;

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
        select: {
          id: true, title: true, slug: true, excerpt: true,
          category: true, coverImage: true, publishedAt: true, views: true,
          author: { select: { name: true } },
        },
      }),
      prisma.blog.count({ where }),
    ]);

    sendPaginated(res, blogs, total, page, limit, 'blogs');
  } catch {
    sendError(res, 'Failed to fetch blogs', 500);
  }
};

export const getBlogBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug: req.params.slug },
      include: { author: { select: { name: true } } },
    });
    if (!blog || blog.status !== 'PUBLISHED') { sendError(res, 'Blog not found', 404); return; }

    // Increment views
    await prisma.blog.update({ where: { id: blog.id }, data: { views: { increment: 1 } } });

    sendSuccess(res, { blog });
  } catch {
    sendError(res, 'Failed to fetch blog', 500);
  }
};

export const createBlog = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const blog = await prisma.blog.create({
      data: {
        ...req.body,
        authorId:    req.user!.userId,
        publishedAt: req.body.status === 'PUBLISHED' ? new Date() : undefined,
      },
    });
    sendSuccess(res, { blog }, 'Blog created successfully', 201);
  } catch {
    sendError(res, 'Failed to create blog', 500);
  }
};

export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const existing = await prisma.blog.findUnique({ where: { id: req.params.id } });
    if (!existing) { sendError(res, 'Blog not found', 404); return; }

    const blog = await prisma.blog.update({
      where: { id: req.params.id },
      data: {
        ...req.body,
        publishedAt:
          req.body.status === 'PUBLISHED' && !existing.publishedAt
            ? new Date()
            : existing.publishedAt,
      },
    });
    sendSuccess(res, { blog }, 'Blog updated successfully');
  } catch {
    sendError(res, 'Failed to update blog', 500);
  }
};

export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.blog.delete({ where: { id: req.params.id } });
    sendSuccess(res, {}, 'Blog deleted successfully');
  } catch {
    sendError(res, 'Failed to delete blog', 500);
  }
};

import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import prisma from '../config/prisma';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getAllGalleryItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const page     = parseInt(req.query.page     as string) || 1;
    const limit    = parseInt(req.query.limit    as string) || 20;
    const category = req.query.category as string | undefined;
    const skip     = (page - 1) * limit;

    const where: Record<string, unknown> = { isPublished: true };
    if (category) where.category = category;

    const [items, total] = await Promise.all([
      prisma.galleryItem.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      prisma.galleryItem.count({ where }),
    ]);

    sendPaginated(res, items, total, page, limit, 'items');
  } catch {
    sendError(res, 'Failed to fetch gallery items', 500);
  }
};

export const uploadGalleryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) { sendError(res, 'No file uploaded', 400); return; }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder:         'shrisaya-foundation',
      resource_type:  'auto',
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    });

    const item = await prisma.galleryItem.create({
      data: {
        title:        req.body.title || 'Gallery Image',
        description:  req.body.description,
        url:          result.secure_url,
        thumbnailUrl: result.secure_url.replace('/upload/', '/upload/w_400,h_300,c_fill/'),
        cloudinaryId: result.public_id,
        category:     req.body.category,
        type:         result.resource_type === 'video' ? 'VIDEO' : 'IMAGE',
      },
    });

    sendSuccess(res, { item }, 'Uploaded successfully', 201);
  } catch {
    sendError(res, 'Upload failed', 500);
  }
};

export const deleteGalleryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await prisma.galleryItem.findUnique({ where: { id: req.params.id } });
    if (!item) { sendError(res, 'Item not found', 404); return; }

    if (item.cloudinaryId) {
      await cloudinary.uploader.destroy(item.cloudinaryId);
    }
    await prisma.galleryItem.delete({ where: { id: req.params.id } });
    sendSuccess(res, {}, 'Deleted successfully');
  } catch {
    sendError(res, 'Delete failed', 500);
  }
};

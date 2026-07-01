import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import {
  getAllGalleryItems,
  uploadGalleryItem,
  deleteGalleryItem,
} from '../controllers/gallery.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const storage = multer.diskStorage({
  destination: '/tmp/uploads/',
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${Math.random().toString(36).substr(2,9)}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|mp4|mov/;
    const ext = path.extname(file.originalname).toLowerCase().substring(1);
    if (allowed.test(ext)) cb(null, true);
    else cb(new Error('Invalid file type'));
  },
});

const router = Router();

router.get('/',       getAllGalleryItems);
router.post('/',      authenticate, requireRole('SUPER_ADMIN','ADMIN','EDITOR'), upload.single('file'), uploadGalleryItem);
router.delete('/:id', authenticate, requireRole('SUPER_ADMIN','ADMIN'),          deleteGalleryItem);

export default router;

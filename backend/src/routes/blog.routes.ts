import { Router } from 'express';
import {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blog.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.get('/',        getAllBlogs);
router.get('/:slug',   getBlogBySlug);
router.post('/',       authenticate, requireRole('SUPER_ADMIN','ADMIN','EDITOR'), createBlog);
router.put('/:id',     authenticate, requireRole('SUPER_ADMIN','ADMIN','EDITOR'), updateBlog);
router.delete('/:id',  authenticate, requireRole('SUPER_ADMIN','ADMIN'),          deleteBlog);

export default router;

import express from 'express';
import {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlogsAdmin,
} from '../controllers/blogController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getBlogs);
router.get('/:slug', getBlog);

// Admin routes
router.get('/admin/all', protect, adminOnly, getAllBlogsAdmin);
router.post('/', protect, adminOnly, createBlog);
router.put('/:id', protect, adminOnly, updateBlog);
router.delete('/:id', protect, adminOnly, deleteBlog);

export default router;

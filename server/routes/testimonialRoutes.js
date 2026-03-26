import express from 'express';
import {
    getTestimonials,
    getAllTestimonialsAdmin,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
} from '../controllers/testimonialController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getTestimonials);
router.post('/', createTestimonial);

// Admin routes
router.get('/all', protect, adminOnly, getAllTestimonialsAdmin);
router.put('/:id', protect, adminOnly, updateTestimonial);
router.delete('/:id', protect, adminOnly, deleteTestimonial);

export default router;

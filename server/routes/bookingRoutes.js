import express from 'express';
import {
    createBooking,
    getBookings,
    getBooking,
    updateBooking,
    deleteBooking,
} from '../controllers/bookingController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/', createBooking);

// Admin routes
router.get('/', protect, adminOnly, getBookings);
router.get('/:id', protect, adminOnly, getBooking);
router.put('/:id', protect, adminOnly, updateBooking);
router.delete('/:id', protect, adminOnly, deleteBooking);

export default router;

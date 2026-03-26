import express from 'express';
import {
    createContact,
    getContacts,
    markAsRead,
    deleteContact,
} from '../controllers/contactController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/', createContact);

// Admin routes
router.get('/', protect, adminOnly, getContacts);
router.put('/:id', protect, adminOnly, markAsRead);
router.delete('/:id', protect, adminOnly, deleteContact);

export default router;

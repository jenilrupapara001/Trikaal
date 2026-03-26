import express from 'express';
import {
    getServices,
    getService,
    createService,
    updateService,
    deleteService,
    getAllServicesAdmin,
} from '../controllers/serviceController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getServices);
router.get('/:slug', getService);

// Admin routes
router.get('/admin/all', protect, adminOnly, getAllServicesAdmin);
router.post('/', protect, adminOnly, createService);
router.put('/:id', protect, adminOnly, updateService);
router.delete('/:id', protect, adminOnly, deleteService);

export default router;

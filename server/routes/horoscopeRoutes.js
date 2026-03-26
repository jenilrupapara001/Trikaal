import express from 'express';
import {
    getHoroscope,
    getAllHoroscopesAdmin,
    createHoroscope,
    updateHoroscope,
    deleteHoroscope,
} from '../controllers/horoscopeController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/:sign/:type', getHoroscope);

// Admin routes
router.get('/', protect, adminOnly, getAllHoroscopesAdmin);
router.post('/', protect, adminOnly, createHoroscope);
router.put('/:id', protect, adminOnly, updateHoroscope);
router.delete('/:id', protect, adminOnly, deleteHoroscope);

export default router;

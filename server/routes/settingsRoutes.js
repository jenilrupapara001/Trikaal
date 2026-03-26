import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getSettings);

// Admin routes
router.put('/', protect, adminOnly, updateSettings);

export default router;

const express = require('express');
const router = express.Router();
const emailService = require('../services/emailService');

// Newsletter subscription endpoint
router.post('/subscribe', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Validate email format
        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Send newsletter confirmation
        await emailService.sendEmail(email, 'newsletterWelcome', { email });

        res.status(200).json({ message: 'Successfully subscribed to Weekly Oracle' });
    } catch (err) {
        console.error('Newsletter subscription error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const emailService = require('../services/emailService');

// Public endpoint for contact form
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required' });
        }

        // Send inquiry email to admin
        await emailService.sendEmail(process.env.ADMIN_EMAIL || 'guidance@trikaal.com', 'contactInquiry', {
            name,
            email,
            subject,
            message,
            submittedAt: new Date()
        });

        res.status(200).json({ message: 'Inquiry received successfully' });
    } catch (err) {
        console.error('Contact form error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;

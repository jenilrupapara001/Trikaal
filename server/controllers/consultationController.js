const Consultation = require('../models/Consultation');
const emailService = require('../services/emailService');

exports.createConsultation = async (req, res) => {
    try {
        const { 
            type, 
            serviceName, 
            mode, 
            priority, 
            amount, 
            clientDetails, 
            astrologyDetails, 
            vastuDetails 
        } = req.body;

        const consultation = new Consultation({
            userId: req.user ? req.user.id : null,
            type,
            serviceName,
            mode,
            priority,
            amount,
            clientDetails,
            astrologyDetails,
            vastuDetails
        });

        await consultation.save();
        
        // Send email notification
        await emailService.sendEmail(clientDetails.email, 'bookingReceived', consultation);
        
        res.status(201).json(consultation);
    } catch (err) {
        console.error('Error creating consultation:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getMyConsultations = async (req, res) => {
    try {
        // If no user, return error (needs authentication)
        if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
        
        const consultations = await Consultation.find({ userId: req.user.id }).sort({ requestedAt: -1 });
        res.json(consultations);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllConsultations = async (req, res) => {
    try {
        // Correct check for admin role
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        
        const consultations = await Consultation.find().populate('userId', 'name email').sort({ requestedAt: -1 });
        res.json(consultations);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        
        const { status, scheduledAt, paymentStatus } = req.body;
        const consultation = await Consultation.findByIdAndUpdate(
            req.params.id,
            { status, scheduledAt, paymentStatus },
            { new: true }
        );
        
        if (!consultation) return res.status(404).json({ message: 'Consultation not found' });

        // If newly confirmed, send confirmation email
        if (status === 'Confirmed' && consultation.status === 'Confirmed') {
             await emailService.sendEmail(consultation.clientDetails.email, 'bookingConfirmed', consultation);
        }
        
        res.json(consultation);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

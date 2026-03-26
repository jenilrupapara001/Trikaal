const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional for guest bookings
    type: { type: String, enum: ['Astrology', 'Vastu'], required: true },
    serviceName: { type: String, required: true },
    mode: { type: String, enum: ['Online', 'In-Person', 'Site-Visit'], default: 'Online' },
    priority: { type: String, enum: ['Standard', 'Urgent'], default: 'Standard' },
    status: { 
        type: String, 
        enum: ['New', 'Paid', 'Confirmed', 'Completed', 'Cancelled'], 
        default: 'New' 
    },
    requestedAt: { type: Date, default: Date.now },
    scheduledAt: { type: Date },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'AED' },
    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Refunded'], default: 'Pending' },
    
    // Detailed Intake Data (from BookingPage)
    clientDetails: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },
    astrologyDetails: {
        dob: Date,
        tob: String,
        pob: String,
        gender: String,
        concerns: String
    },
    vastuDetails: {
        propertyType: String,
        area: Number,
        location: String,
        concerns: String
    }
});

module.exports = mongoose.model('Consultation', consultationSchema);

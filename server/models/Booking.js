import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        trim: true,
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: [true, 'Service is required'],
    },
    date: {
        type: Date,
        required: [true, 'Date is required'],
    },
    time: {
        type: String,
        required: [true, 'Time is required'],
    },
    dob: {
        type: Date,
    },
    birthTime: {
        type: String,
    },
    birthPlace: {
        type: String,
    },
    message: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;

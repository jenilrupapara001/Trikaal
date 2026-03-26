import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        unique: true,
        lowercase: true,
    },
    shortDescription: {
        type: String,
        required: [true, 'Short description is required'],
        trim: true,
    },
    fullDescription: {
        type: String,
        required: [true, 'Full description is required'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['vedic', 'western', 'numerology', 'tarot', 'vastu', 'kundali', 'compatibility'],
    },
    icon: {
        type: String,
        default: '✨',
    },
    price: {
        type: String,
        required: [true, 'Price is required'],
    },
    duration: {
        type: String,
        required: [true, 'Duration is required'],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    faqs: [{
        question: String,
        answer: String,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

serviceSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;

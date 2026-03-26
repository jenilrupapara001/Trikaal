import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    location: {
        type: String,
        trim: true,
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: 1,
        max: 5,
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    avatar: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'approved'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;

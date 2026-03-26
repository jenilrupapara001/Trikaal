import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
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
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    excerpt: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['vedic', 'western', 'numerology', 'tarot', 'vastu', 'Spirituality', 'Lifestyle'],
    },
    featuredImage: {
        type: String,
    },
    author: {
        type: String,
        default: 'Cosmic Guru',
    },
    tags: [{
        type: String,
    }],
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft',
    },
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
    },
    ogImage: {
        type: String,
    },
    readTime: {
        type: Number,
        default: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

blogSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;

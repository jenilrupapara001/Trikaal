import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema({
    siteName: {
        type: String,
        default: 'CosmicGuru',
    },
    tagline: {
        type: String,
        default: 'Your Journey to the Stars',
    },
    contactEmail: {
        type: String,
        default: 'contact@cosmicguru.com',
    },
    phone: {
        type: String,
        default: '+91 98765 43210',
    },
    whatsapp: {
        type: String,
        default: '+91 98765 43210',
    },
    instagram: {
        type: String,
        default: '',
    },
    facebook: {
        type: String,
        default: '',
    },
    youtube: {
        type: String,
        default: '',
    },
    defaultMetaTitle: {
        type: String,
        default: 'CosmicGuru - Vedic Astrology & Cosmic Guidance',
    },
    defaultMetaDescription: {
        type: String,
        default: 'Discover your cosmic destiny with expert Vedic astrology readings, tarot card consultations, and numerology services.',
    },
    googleAnalyticsId: {
        type: String,
        default: '',
    },
    heroHeading: {
        type: String,
        default: 'Begin Your Cosmic Journey',
    },
    heroSubheading: {
        type: String,
        default: 'Discover the wisdom of the stars with personalized astrological guidance',
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

siteSettingsSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);

export default SiteSettings;

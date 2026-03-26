import mongoose from 'mongoose';

const horoscopeSchema = new mongoose.Schema({
    sign: {
        type: String,
        required: [true, 'Zodiac sign is required'],
        enum: ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'],
    },
    type: {
        type: String,
        required: [true, 'Horoscope type is required'],
        enum: ['daily', 'weekly', 'monthly'],
    },
    date: {
        type: Date,
        required: function () { return this.type === 'daily'; }
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    luckyColor: {
        type: String,
    },
    luckyNumber: {
        type: Number,
    },
    compatibility: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Index for faster queries
horoscopeSchema.index({ sign: 1, type: 1, date: -1 });

const Horoscope = mongoose.model('Horoscope', horoscopeSchema);

export default Horoscope;

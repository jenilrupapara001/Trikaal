import Horoscope from '../models/Horoscope.js';

// @desc    Get horoscope by sign and type
// @route   GET /api/horoscopes/:sign/:type
// @access  Public
export const getHoroscope = async (req, res, next) => {
    try {
        const { sign, type } = req.params;

        let query = { sign, type };

        if (type === 'daily') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            query.date = {
                $gte: today,
                $lt: tomorrow
            };
        }

        const horoscope = await Horoscope.findOne(query).sort({ date: -1 });

        if (!horoscope) {
            return res.status(404).json({
                success: false,
                message: 'Horoscope not found',
            });
        }

        res.json({
            success: true,
            horoscope,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all horoscopes for admin
// @route   GET /api/horoscopes
// @access  Private/Admin
export const getAllHoroscopesAdmin = async (req, res, next) => {
    try {
        const horoscopes = await Horoscope.find().sort({ createdAt: -1 }).populate('sign');

        res.json({
            success: true,
            horoscopes,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create horoscope
// @route   POST /api/horoscopes
// @access  Private/Admin
export const createHoroscope = async (req, res, next) => {
    try {
        const { sign, type, date, content, luckyColor, luckyNumber, compatibility } = req.body;

        const horoscope = await Horoscope.create({
            sign,
            type,
            date: type === 'daily' ? date : null,
            content,
            luckyColor,
            luckyNumber,
            compatibility,
        });

        res.status(201).json({
            success: true,
            horoscope,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update horoscope
// @route   PUT /api/horoscopes/:id
// @access  Private/Admin
export const updateHoroscope = async (req, res, next) => {
    try {
        const { sign, type, date, content, luckyColor, luckyNumber, compatibility } = req.body;

        const horoscope = await Horoscope.findById(req.params.id);

        if (!horoscope) {
            return res.status(404).json({
                success: false,
                message: 'Horoscope not found',
            });
        }

        horoscope.sign = sign || horoscope.sign;
        horoscope.type = type || horoscope.type;
        horoscope.date = type === 'daily' ? (date || horoscope.date) : null;
        horoscope.content = content || horoscope.content;
        horoscope.luckyColor = luckyColor || horoscope.luckyColor;
        horoscope.luckyNumber = luckyNumber || horoscope.luckyNumber;
        horoscope.compatibility = compatibility || horoscope.compatibility;

        await horoscope.save();

        res.json({
            success: true,
            horoscope,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete horoscope
// @route   DELETE /api/horoscopes/:id
// @access  Private/Admin
export const deleteHoroscope = async (req, res, next) => {
    try {
        const horoscope = await Horoscope.findById(req.params.id);

        if (!horoscope) {
            return res.status(404).json({
                success: false,
                message: 'Horoscope not found',
            });
        }

        await horoscope.deleteOne();

        res.json({
            success: true,
            message: 'Horoscope deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

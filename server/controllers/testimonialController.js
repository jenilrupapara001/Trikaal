import Testimonial from '../models/Testimonial.js';

// @desc    Get approved testimonials (public)
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = async (req, res, next) => {
    try {
        const testimonials = await Testimonial.find({ status: 'approved' }).sort({ createdAt: -1 });

        res.json({
            success: true,
            testimonials,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all testimonials for admin
// @route   GET /api/testimonials/all
// @access  Private/Admin
export const getAllTestimonialsAdmin = async (req, res, next) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            testimonials,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create testimonial (public)
// @route   POST /api/testimonials
// @access  Public
export const createTestimonial = async (req, res, next) => {
    try {
        const { name, location, rating, content, avatar } = req.body;

        const testimonial = await Testimonial.create({
            name,
            location,
            rating,
            content,
            avatar,
            status: 'pending',
        });

        res.status(201).json({
            success: true,
            message: 'Testimonial submitted successfully. It will be reviewed shortly.',
            testimonial,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update testimonial status
// @route   PUT /api/testimonials/:id
// @access  Private/Admin
export const updateTestimonial = async (req, res, next) => {
    try {
        const { status } = req.body;

        const testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found',
            });
        }

        testimonial.status = status || testimonial.status;
        await testimonial.save();

        res.json({
            success: true,
            testimonial,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
export const deleteTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found',
            });
        }

        await testimonial.deleteOne();

        res.json({
            success: true,
            message: 'Testimonial deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

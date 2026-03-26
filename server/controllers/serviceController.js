import Service from '../models/Service.js';
import slugify from '../utils/slugify.js';

// @desc    Get all services (public)
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res, next) => {
    try {
        const query = { isActive: true };

        if (req.query.category) {
            query.category = req.query.category;
        }

        const services = await Service.find(query).sort({ createdAt: -1 });

        res.json({
            success: true,
            services,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single service
// @route   GET /api/services/:slug
// @access  Public
export const getService = async (req, res, next) => {
    try {
        const service = await Service.findOne({ slug: req.params.slug, isActive: true });

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found',
            });
        }

        res.json({
            success: true,
            service,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create service (admin)
// @route   POST /api/services
// @access  Private/Admin
export const createService = async (req, res, next) => {
    try {
        const { title, shortDescription, fullDescription, category, icon, price, duration, faqs } = req.body;

        let slug = slugify(title);

        const existingService = await Service.findOne({ slug });
        if (existingService) {
            slug = `${slug}-${Date.now()}`;
        }

        const service = await Service.create({
            title,
            slug,
            shortDescription,
            fullDescription,
            category,
            icon: icon || '✨',
            price,
            duration,
            faqs: faqs || [],
        });

        res.status(201).json({
            success: true,
            service,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update service (admin)
// @route   PUT /api/services/:id
// @access  Private/Admin
export const updateService = async (req, res, next) => {
    try {
        const { title, shortDescription, fullDescription, category, icon, price, duration, isActive, faqs } = req.body;

        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found',
            });
        }

        let slug = service.slug;
        if (title && title !== service.title) {
            slug = slugify(title);
            const existingService = await Service.findOne({ slug, _id: { $ne: service._id } });
            if (existingService) {
                slug = `${slug}-${Date.now()}`;
            }
        }

        service.title = title || service.title;
        service.slug = slug;
        service.shortDescription = shortDescription || service.shortDescription;
        service.fullDescription = fullDescription || service.fullDescription;
        service.category = category || service.category;
        service.icon = icon || service.icon;
        service.price = price || service.price;
        service.duration = duration || service.duration;
        service.isActive = isActive !== undefined ? isActive : service.isActive;
        service.faqs = faqs || service.faqs;

        await service.save();

        res.json({
            success: true,
            service,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete service (admin)
// @route   DELETE /api/services/:id
// @access  Private/Admin
export const deleteService = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found',
            });
        }

        await service.deleteOne();

        res.json({
            success: true,
            message: 'Service deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all services for admin
// @route   GET /api/services/admin/all
// @access  Private/Admin
export const getAllServicesAdmin = async (req, res, next) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            services,
        });
    } catch (error) {
        next(error);
    }
};

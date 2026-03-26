import Booking from '../models/Booking.js';
import Service from '../models/Service.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Create booking (public)
// @route   POST /api/bookings
// @access  Public
export const createBooking = async (req, res, next) => {
    try {
        const { name, email, phone, service, date, time, dob, birthTime, birthPlace, message } = req.body;

        // Get service details
        const serviceData = await Service.findById(service);
        if (!serviceData) {
            return res.status(404).json({
                success: false,
                message: 'Service not found',
            });
        }

        const booking = await Booking.create({
            name,
            email,
            phone,
            service,
            date,
            time,
            dob,
            birthTime,
            birthPlace,
            message,
        });

        // Populate service for email
        await booking.populate('service');

        // Send confirmation email to customer
        const emailMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C9A84C;">Booking Confirmed!</h2>
        <p>Dear ${name},</p>
        <p>Your booking has been received. Here are the details:</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Service:</strong> ${serviceData.title}</p>
          <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${time}</p>
        </div>
        <p>We will contact you shortly to confirm your appointment.</p>
        <p>Best regards,<br>CosmicGuru Team</p>
      </div>
    `;

        await sendEmail({
            email,
            subject: 'Booking Confirmation - CosmicGuru',
            message: emailMessage,
        });

        // Also send notification to admin
        const adminEmail = process.env.EMAIL_USER;
        const adminMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C9A84C;">New Booking Received!</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service:</strong> ${serviceData.title}</p>
          <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${time}</p>
        </div>
      </div>
    `;

        await sendEmail({
            email: adminEmail,
            subject: 'New Booking - CosmicGuru',
            message: adminMessage,
        });

        res.status(201).json({
            success: true,
            booking,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all bookings (admin)
// @route   GET /api/bookings
// @access  Private/Admin
export const getBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find()
            .populate('service', 'title price')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            bookings,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private/Admin
export const getBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('service');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found',
            });
        }

        res.json({
            success: true,
            booking,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private/Admin
export const updateBooking = async (req, res, next) => {
    try {
        const { status } = req.body;

        const booking = await Booking.findById(req.params.id).populate('service');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found',
            });
        }

        booking.status = status || booking.status;
        await booking.save();

        // Send status update email to customer
        const statusMessages = {
            confirmed: 'Your booking has been confirmed!',
            completed: 'Your reading has been completed. Thank you!',
            cancelled: 'Your booking has been cancelled.',
        };

        const emailMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C9A84C;">Booking Update</h2>
        <p>Dear ${booking.name},</p>
        <p>${statusMessages[status] || 'Your booking status has been updated.'}</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Service:</strong> ${booking.service.title}</p>
          <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${booking.time}</p>
          <p><strong>Status:</strong> ${status}</p>
        </div>
        <p>Best regards,<br>CosmicGuru Team</p>
      </div>
    `;

        await sendEmail({
            email: booking.email,
            subject: `Booking ${status.charAt(0).toUpperCase() + status.slice(1)} - CosmicGuru`,
            message: emailMessage,
        });

        res.json({
            success: true,
            booking,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private/Admin
export const deleteBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found',
            });
        }

        await booking.deleteOne();

        res.json({
            success: true,
            message: 'Booking deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

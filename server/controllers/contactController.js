import Contact from '../models/Contact.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Create contact message (public)
// @route   POST /api/contact
// @access  Public
export const createContact = async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;

        const contact = await Contact.create({
            name,
            email,
            subject,
            message,
        });

        // Send confirmation to customer
        const emailMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C9A84C;">Message Received!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to us. We have received your message and will get back to you shortly.</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
        <p>Best regards,<br>CosmicGuru Team</p>
      </div>
    `;

        await sendEmail({
            email,
            subject: 'Message Received - CosmicGuru',
            message: emailMessage,
        });

        // Send notification to admin
        const adminEmail = process.env.EMAIL_USER;
        const adminMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C9A84C;">New Contact Message!</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      </div>
    `;

        await sendEmail({
            email: adminEmail,
            subject: `New Contact: ${subject}`,
            message: adminMessage,
        });

        res.status(201).json({
            success: true,
            message: 'Message sent successfully! We will get back to you soon.',
            contact,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all contact messages (admin)
// @route   GET /api/contact
// @access  Private/Admin
export const getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            contacts,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Mark contact as read
// @route   PUT /api/contact/:id
// @access  Private/Admin
export const markAsRead = async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found',
            });
        }

        contact.isRead = true;
        await contact.save();

        res.json({
            success: true,
            contact,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteContact = async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found',
            });
        }

        await contact.deleteOne();

        res.json({
            success: true,
            message: 'Contact deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

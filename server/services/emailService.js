const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

// Templates
const templates = {
    bookingReceived: (data) => ({
        subject: `New Consultation Request: ${data.serviceName}`,
        html: `
            <div style="font-family: 'Inter', sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #C9A84C; border-radius: 15px; overflow: hidden; background-color: #050505;">
                <div style="background: linear-gradient(to bottom, #C9A84C, #A6872E); padding: 30px; text-align: center;">
                    <h1 style="color: #050505; margin: 0; font-family: 'serif';">Trikaal Astrology</h1>
                </div>
                <div style="padding: 40px; background-color: #0a0a0a; color: #E5E5E5;">
                    <h2 style="color: #C9A84C;">Namaste ${data.clientDetails.name},</h2>
                    <p style="font-size: 16px; line-height: 1.6;">We have received your requested for a <strong>${data.serviceName}</strong>. Our celestial consultants are currently reviewing your details.</p>
                    
                    <div style="background: rgba(201,168,76,0.05); border: 1px solid rgba(201,168,76,0.1); border-radius: 10px; padding: 20px; margin: 30px 0;">
                        <h3 style="color: #C9A84C; margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Request Summary</h3>
                        <p style="margin: 5px 0;"><strong>Service:</strong> ${data.serviceName}</p>
                        <p style="margin: 5px 0;"><strong>Priority:</strong> ${data.priority}</p>
                        <p style="margin: 5px 0;"><strong>Amount:</strong> AED ${data.amount}</p>
                    </div>

                    <p style="font-size: 14px; color: #999;">You will receive a confirmation email with your scheduled time once we have processed your request.</p>
                </div>
                <div style="background-color: #0a0a0a; padding: 20px; border-top: 1px solid rgba(201,168,76,0.1); text-align: center; font-size: 12px; color: #666;">
                    © 2024 Trikaal Astrology Services. All Rights Reserved.
                </div>
            </div>
        `
    }),
    bookingConfirmed: (data) => ({
        subject: `Celestial Confirmation: Your Session is Scheduled`,
        html: `
            <div style="font-family: 'Inter', sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #C9A84C; border-radius: 15px; overflow: hidden; background-color: #050505;">
                <div style="background: linear-gradient(to bottom, #C9A84C, #A6872E); padding: 30px; text-align: center;">
                    <h1 style="color: #050505; margin: 0; font-family: 'serif';">Confirmed</h1>
                </div>
                <div style="padding: 40px; background-color: #0a0a0a; color: #E5E5E5;">
                    <h2 style="color: #C9A84C;">Greetings ${data.clientDetails.name},</h2>
                    <p style="font-size: 16px; line-height: 1.6;">Your <strong>${data.serviceName}</strong> with Smeet has been officially scheduled. The stars have aligned for your guidance.</p>
                    
                    <div style="background: linear-gradient(45deg, rgba(201,168,76,0.1), transparent); border: 2px solid #C9A84C; border-radius: 10px; padding: 25px; margin: 30px 0; text-align: center;">
                        <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #C9A84C; display: block; margin-bottom: 10px;">Your Scheduled Time</span>
                        <h3 style="color: #FFF; margin: 0; font-size: 24px;">${new Date(data.scheduledAt).toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short' })}</h3>
                        <p style="color: #C9A84C; margin-top: 10px; font-size: 14px;">Mode: <strong>${data.mode}</strong></p>
                    </div>

                    <p style="font-size: 16px; line-height: 1.6;">Please ensure you are in a quiet, undisturbed space 5 minutes prior to the session. If this is an online session, a link was attached to your invitation or will be shared shortly.</p>
                    
                    <a href="https://trikaal.com/booking" style="display: inline-block; background: #C9A84C; color: #050505; padding: 15px 30px; border-radius: 30px; text-decoration: none; font-weight: bold; font-size: 14px; margin-top: 20px;">Manage My Booking</a>
                </div>
                <div style="background-color: #0a0a0a; padding: 20px; border-top: 1px solid rgba(201,168,76,0.1); text-align: center; font-size: 12px; color: #666;">
                    © 2024 Trikaal Astrology Services. All Rights Reserved.
                </div>
            </div>
        `
    }),
    contactInquiry: (data) => ({
        subject: `New Inquiry from ${data.name} - ${data.subject}`,
        html: `
            <div style="font-family: 'Inter', sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #C9A84C; border-radius: 15px; overflow: hidden; background-color: #050505;">
                <div style="background: linear-gradient(to bottom, #C9A84C, #A6872E); padding: 30px; text-align: center;">
                    <h1 style="color: #050505; margin: 0; font-family: 'serif';">Trikaal Astrology</h1>
                </div>
                <div style="padding: 40px; background-color: #0a0a0a; color: #E5E5E5;">
                    <h2 style="color: #C9A84C;">New Inquiry Received</h2>
                    
                    <div style="background: rgba(201,168,76,0.05); border: 1px solid rgba(201,168,76,0.1); border-radius: 10px; padding: 20px; margin: 30px 0;">
                        <p style="margin: 5px 0;"><strong>Name:</strong> ${data.name}</p>
                        <p style="margin: 5px 0;"><strong>Email:</strong> ${data.email}</p>
                        <p style="margin: 5px 0;"><strong>Subject:</strong> ${data.subject}</p>
                        <p style="margin: 5px 0;"><strong>Message:</strong></p>
                        <p style="margin: 5px 0; color: #999;">${data.message}</p>
                    </div>

                    <p style="font-size: 14px; color: #999;">Submitted on: ${new Date(data.submittedAt).toLocaleString()}</p>
                </div>
                <div style="background-color: #0a0a0a; padding: 20px; border-top: 1px solid rgba(201,168,76,0.1); text-align: center; font-size: 12px; color: #666;">
                    © 2024 Trikaal Astrology Services. All Rights Reserved.
                </div>
            </div>
        `
    }),
    newsletterWelcome: (data) => ({
        subject: `Welcome to Trikaal's Weekly Oracle`,
        html: `
            <div style="font-family: 'Inter', sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #C9A84C; border-radius: 15px; overflow: hidden; background-color: #050505;">
                <div style="background: linear-gradient(to bottom, #C9A84C, #A6872E); padding: 30px; text-align: center;">
                    <h1 style="color: #050505; margin: 0; font-family: 'serif';">Trikaal Astrology</h1>
                </div>
                <div style="padding: 40px; background-color: #0a0a0a; color: #E5E5E5;">
                    <h2 style="color: #C9A84C;">Welcome to the Weekly Oracle!</h2>
                    <p style="font-size: 16px; line-height: 1.6;">Namaste <strong>${data.email}</strong>,</p>
                    <p style="font-size: 16px; line-height: 1.6;">You have successfully subscribed to our Weekly Oracle. Prepare to receive celestial insights, astrological forecasts, and spiritual wisdom directly to your inbox.</p>
                    
                    <a href="https://trikaal.com" style="display: inline-block; background: #C9A84C; color: #050505; padding: 15px 30px; border-radius: 30px; text-decoration: none; font-weight: bold; font-size: 14px; margin-top: 20px;">Explore Trikaal</a>
                </div>
                <div style="background-color: #0a0a0a; padding: 20px; border-top: 1px solid rgba(201,168,76,0.1); text-align: center; font-size: 12px; color: #666;">
                    © 2024 Trikaal Astrology Services. All Rights Reserved.
                </div>
            </div>
        `
    })
};

exports.sendEmail = async (to, templateName, data) => {
    try {
        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
            console.warn('Email credentials missing. Skipping email send.');
            return;
        }

        const template = templates[templateName](data);
        const mailOptions = {
            from: `"Trikaal Astrology" <${process.env.GMAIL_USER}>`,
            to,
            subject: template.subject,
            html: template.html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
    } catch (err) {
        console.error('Error sending email:', err);
    }
};

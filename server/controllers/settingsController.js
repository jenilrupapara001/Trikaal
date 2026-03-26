import SiteSettings from '../models/SiteSettings.js';

// @desc    Get site settings (public)
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res, next) => {
    try {
        let settings = await SiteSettings.findOne();

        if (!settings) {
            settings = await SiteSettings.create({});
        }

        res.json({
            success: true,
            settings,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update site settings (admin)
// @route   PUT /api/settings
// @access  Private/Admin
export const updateSettings = async (req, res, next) => {
    try {
        const {
            siteName,
            tagline,
            contactEmail,
            phone,
            whatsapp,
            instagram,
            facebook,
            youtube,
            defaultMetaTitle,
            defaultMetaDescription,
            googleAnalyticsId,
            heroHeading,
            heroSubheading,
        } = req.body;

        let settings = await SiteSettings.findOne();

        if (!settings) {
            settings = await SiteSettings.create({});
        }

        settings.siteName = siteName || settings.siteName;
        settings.tagline = tagline || settings.tagline;
        settings.contactEmail = contactEmail || settings.contactEmail;
        settings.phone = phone || settings.phone;
        settings.whatsapp = whatsapp || settings.whatsapp;
        settings.instagram = instagram || settings.instagram;
        settings.facebook = facebook || settings.facebook;
        settings.youtube = youtube || settings.youtube;
        settings.defaultMetaTitle = defaultMetaTitle || settings.defaultMetaTitle;
        settings.defaultMetaDescription = defaultMetaDescription || settings.defaultMetaDescription;
        settings.googleAnalyticsId = googleAnalyticsId || settings.googleAnalyticsId;
        settings.heroHeading = heroHeading || settings.heroHeading;
        settings.heroSubheading = heroSubheading || settings.heroSubheading;

        await settings.save();

        res.json({
            success: true,
            settings,
        });
    } catch (error) {
        next(error);
    }
};

import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { motion } from 'framer-motion';

const SettingsPage = () => {
    const [settings, setSettings] = useState({
        siteName: 'Trikaal',
        siteTagline: 'Modern Vedic Science',
        contactEmail: 'contact@trikaal.com',
        contactPhone: '+971 50 123 4567',
        address: 'Dubai, UAE',
        facebook: 'https://facebook.com/trikaal',
        instagram: 'https://instagram.com/trikaal',
        youtube: 'https://youtube.com/trikaal',
        enableBookings: true,
        enableBlog: true,
        enableNotifications: true
    });

    const [saved, setSaved] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        // In a real app, this would save to the server
        console.log('Settings saved:', settings);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleChange = (field, value) => {
        setSettings({ ...settings, [field]: value });
    };

    const toggleSetting = (field) => {
        setSettings({ ...settings, [field]: !settings[field] });
    };

    return (
        <AdminLayout title="Celestial Configuration">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl space-y-8"
            >
                {/* Success Message */}
                {saved && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-500/10 border border-green-500/30 text-green-400 px-6 py-4 rounded-xl"
                    >
                        Configuration preserved in the cosmic archives.
                    </motion.div>
                )}

                <form onSubmit={handleSave} className="space-y-8">
                    {/* General Settings */}
                    <div className="bg-surface-container rounded-2xl border border-primary/10 p-8 shadow-2xl">
                        <h3 className="text-lg font-headline font-bold text-primary mb-6">General Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-2">Site Name</label>
                                <input
                                    type="text"
                                    value={settings.siteName}
                                    onChange={(e) => handleChange('siteName', e.target.value)}
                                    className="w-full bg-surface-container/50 border border-primary/10 rounded-xl py-3 px-4 text-on-surface focus:border-primary/40 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-2">Tagline</label>
                                <input
                                    type="text"
                                    value={settings.siteTagline}
                                    onChange={(e) => handleChange('siteTagline', e.target.value)}
                                    className="w-full bg-surface-container/50 border border-primary/10 rounded-xl py-3 px-4 text-on-surface focus:border-primary/40 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-2">Contact Email</label>
                                <input
                                    type="email"
                                    value={settings.contactEmail}
                                    onChange={(e) => handleChange('contactEmail', e.target.value)}
                                    className="w-full bg-surface-container/50 border border-primary/10 rounded-xl py-3 px-4 text-on-surface focus:border-primary/40 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-2">Contact Phone</label>
                                <input
                                    type="tel"
                                    value={settings.contactPhone}
                                    onChange={(e) => handleChange('contactPhone', e.target.value)}
                                    className="w-full bg-surface-container/50 border border-primary/10 rounded-xl py-3 px-4 text-on-surface focus:border-primary/40 outline-none transition-all"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-2">Address</label>
                                <input
                                    type="text"
                                    value={settings.address}
                                    onChange={(e) => handleChange('address', e.target.value)}
                                    className="w-full bg-surface-container/50 border border-primary/10 rounded-xl py-3 px-4 text-on-surface focus:border-primary/40 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="bg-surface-container rounded-2xl border border-primary/10 p-8 shadow-2xl">
                        <h3 className="text-lg font-headline font-bold text-primary mb-6">Celestial Connections</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-2">Facebook</label>
                                <input
                                    type="url"
                                    value={settings.facebook}
                                    onChange={(e) => handleChange('facebook', e.target.value)}
                                    className="w-full bg-surface-container/50 border border-primary/10 rounded-xl py-3 px-4 text-on-surface focus:border-primary/40 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-2">Instagram</label>
                                <input
                                    type="url"
                                    value={settings.instagram}
                                    onChange={(e) => handleChange('instagram', e.target.value)}
                                    className="w-full bg-surface-container/50 border border-primary/10 rounded-xl py-3 px-4 text-on-surface focus:border-primary/40 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-2">YouTube</label>
                                <input
                                    type="url"
                                    value={settings.youtube}
                                    onChange={(e) => handleChange('youtube', e.target.value)}
                                    className="w-full bg-surface-container/50 border border-primary/10 rounded-xl py-3 px-4 text-on-surface focus:border-primary/40 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Feature Toggles */}
                    <div className="bg-surface-container rounded-2xl border border-primary/10 p-8 shadow-2xl">
                        <h3 className="text-lg font-headline font-bold text-primary mb-6">Portal Features</h3>
                        <div className="space-y-4">
                            <label className="flex items-center justify-between p-4 rounded-xl bg-surface-container/30 cursor-pointer hover:bg-surface-container/50 transition-all">
                                <div>
                                    <span className="text-on-surface font-medium">Enable Bookings</span>
                                    <p className="text-on-surface-variant text-xs">Allow clients to book consultations</p>
                                </div>
                                <div
                                    className={`w-12 h-7 rounded-full p-1 transition-all ${settings.enableBookings ? 'bg-primary' : 'bg-primary/20'}`}
                                    onClick={() => setSettings({ ...settings, enableBookings: !settings.enableBookings })}
                                >
                                    <div className={`w-5 h-5 rounded-full bg-on-primary shadow-lg transform transition-all ${settings.enableBookings ? 'translate-x-5' : ''}`} />
                                </div>
                            </label>
                            <label className="flex items-center justify-between p-4 rounded-xl bg-surface-container/30 cursor-pointer hover:bg-surface-container/50 transition-all">
                                <div>
                                    <span className="text-on-surface font-medium">Enable Blog</span>
                                    <p className="text-on-surface-variant text-xs">Show blog posts on the site</p>
                                </div>
                                <div
                                    className={`w-12 h-7 rounded-full p-1 transition-all ${settings.enableBlog ? 'bg-primary' : 'bg-primary/20'}`}
                                    onClick={() => setSettings({ ...settings, enableBlog: !settings.enableBlog })}
                                >
                                    <div className={`w-5 h-5 rounded-full bg-on-primary shadow-lg transform transition-all ${settings.enableBlog ? 'translate-x-5' : ''}`} />
                                </div>
                            </label>
                            <label className="flex items-center justify-between p-4 rounded-xl bg-surface-container/30 cursor-pointer hover:bg-surface-container/50 transition-all">
                                <div>
                                    <span className="text-on-surface font-medium">Enable Notifications</span>
                                    <p className="text-on-surface-variant text-xs">Send email notifications for bookings</p>
                                </div>
                                <div
                                    className={`w-12 h-7 rounded-full p-1 transition-all ${settings.enableNotifications ? 'bg-primary' : 'bg-primary/20'}`}
                                    onClick={() => setSettings({ ...settings, enableNotifications: !settings.enableNotifications })}
                                >
                                    <div className={`w-5 h-5 rounded-full bg-on-primary shadow-lg transform transition-all ${settings.enableNotifications ? 'translate-x-5' : ''}`} />
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Save Button */}
                    <button
                        type="submit"
                        className="w-full py-4 rounded-full gold-gradient text-on-primary font-bold font-label text-xs uppercase tracking-widest shadow-xl hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all"
                    >
                        Preserve Configuration
                    </button>
                </form>
            </motion.div>
        </AdminLayout>
    );
};

export default SettingsPage;

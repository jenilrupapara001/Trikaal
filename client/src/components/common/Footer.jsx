import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../services/api';

const Footer = () => {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await api.get('/settings');
                setSettings(response.data.settings);
            } catch (error) {
                console.error('Error fetching settings:', error);
            }
        };

        fetchSettings();
    }, []);

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-cosmic-charcoal border-t border-primary-gold/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="font-display text-2xl font-bold gradient-text">
                            {settings?.siteName || 'CosmicGuru'}
                        </Link>
                        <p className="mt-4 text-cosmic-lavender font-body text-sm">
                            {settings?.tagline || 'Your Journey to the Stars'}
                        </p>
                        <div className="mt-4 flex space-x-4">
                            {settings?.instagram && (
                                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="text-cosmic-lavender hover:text-primary-gold">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                </a>
                            )}
                            {settings?.facebook && (
                                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="text-cosmic-lavender hover:text-primary-gold">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                </a>
                            )}
                            {settings?.youtube && (
                                <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="text-cosmic-lavender hover:text-primary-gold">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-display text-lg text-primary-gold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/services" className="text-cosmic-lavender hover:text-primary-gold font-body text-sm">Services</Link></li>
                            <li><Link to="/horoscope" className="text-cosmic-lavender hover:text-primary-gold font-body text-sm">Horoscope</Link></li>
                            <li><Link to="/blog" className="text-cosmic-lavender hover:text-primary-gold font-body text-sm">Blog</Link></li>
                            <li><Link to="/about" className="text-cosmic-lavender hover:text-primary-gold font-body text-sm">About Us</Link></li>
                            <li><Link to="/contact" className="text-cosmic-lavender hover:text-primary-gold font-body text-sm">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-display text-lg text-primary-gold mb-4">Contact</h3>
                        <ul className="space-y-2 text-cosmic-lavender font-body text-sm">
                            {settings?.contactEmail && (
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    {settings.contactEmail}
                                </li>
                            )}
                            {settings?.phone && (
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    {settings.phone}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-primary-gold/20 text-center">
                    <p className="text-cosmic-lavender font-body text-sm">
                        © {currentYear} {settings?.siteName || 'CosmicGuru'}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

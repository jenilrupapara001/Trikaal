import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = 'http://localhost:5001/api';

const ContactPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            await axios.post(`${API_URL}/contact`, formData);
            setSubmitStatus('success');
            setTimeout(() => {
                setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
            }, 500);
        } catch (error) {
            console.error('Contact form error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="bg-background text-on-surface min-h-screen">
            <Navbar />

            <main className="pt-32 pb-24 px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left: Info */}
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                        <span className="text-primary font-label text-sm tracking-[0.3em] uppercase block mb-4">Direct Connection</span>
                        <h1 className="text-5xl md:text-6xl font-headline font-bold text-primary mb-8 leading-tight">Reach the Temple of Wisdom</h1>
                        <p className="text-on-surface-variant text-lg font-body font-light mb-12 leading-relaxed max-w-lg">
                            Whether you have questions about our consultations, need help with booking, or seek a bespoke spiritual audit for your organization, we are here to guide you.
                        </p>

                        <div className="space-y-8">
                            {[
                                { icon: 'place', title: 'On-Site Presence', desc: 'Gujarat, India · Dubai, UAE' },
                                { icon: 'mail', title: 'Celestial Mail', desc: 'guidance@trikaal.com' },
                                { icon: 'call', title: 'Vocal Frequency', desc: '+91 (India) · +971 (UAE)' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <div className="w-12 h-12 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-primary">{item.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-headline font-bold text-primary text-xl">{item.title}</h4>
                                        <p className="text-on-surface-variant font-light">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card rounded-2xl p-10 border border-primary/10 shadow-2xl relative"
                    >
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
                        <h3 className="text-2xl font-headline font-bold text-primary mb-8">Send an Inquiry</h3>

                        {/* Success Message */}
                        {submitStatus === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 bg-green-900/30 border border-green-500/30 rounded-xl flex items-center gap-3"
                            >
                                <span className="material-symbols-outlined text-green-400">check_circle</span>
                                <p className="text-green-300 text-sm">Your inquiry has been received. We will respond shortly.</p>
                            </motion.div>
                        )}

                        {/* Error Message */}
                        {submitStatus === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 bg-red-900/30 border border-red-500/30 rounded-xl flex items-center gap-3"
                            >
                                <span className="material-symbols-outlined text-red-400">error</span>
                                <p className="text-red-300 text-sm">Failed to send. Please try again.</p>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-on-surface-variant text-[10px] font-label uppercase tracking-widest mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-background/50 border border-white/5 rounded-xl py-4 px-6 text-on-surface focus:border-primary/40 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-on-surface-variant text-[10px] font-label uppercase tracking-widest mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-background/50 border border-white/5 rounded-xl py-4 px-6 text-on-surface focus:border-primary/40 outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-on-surface-variant text-[10px] font-label uppercase tracking-widest mb-2">Subject</label>
                                <select
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full bg-background/50 border border-white/5 rounded-xl py-4 px-6 text-on-surface focus:border-primary/40 outline-none appearance-none"
                                >
                                    <option>General Inquiry</option>
                                    <option>Custom Vastu Audit</option>
                                    <option>Bespoke Astrology</option>
                                    <option>Technical Support</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-on-surface-variant text-[10px] font-label uppercase tracking-widest mb-2">Message</label>
                                <textarea
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-background/50 border border-white/5 rounded-xl py-4 px-6 text-on-surface focus:border-primary/40 outline-none resize-none"
                                    placeholder="How can we assist your journey?"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-5 gold-gradient rounded-full text-on-primary font-bold font-label tracking-widest uppercase text-xs hover:scale-[1.02] shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="w-4 h-4 rounded-full border-2 border-on-primary/20 border-t-on-primary animate-spin" />
                                        Dispatching...
                                    </>
                                ) : (
                                    'Dispatch Message'
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ServicesPage = () => {
    const services = [
        {
            title: 'Vastu Consultation',
            icon: 'home_work',
            description: 'Align your living or working space with universal energy flow to invite prosperity and peace.',
            path: '/vastu',
            features: ['On-Site Analysis', 'Digital Audit', 'Practical Remedies']
        },
        {
            title: 'Jyotish Astrology',
            icon: 'auto_awesome',
            description: 'Deep natal chart analysis to understand your life path, strengths, and celestial transitions.',
            path: '/astrology',
            features: ['Kundli Analysis', 'Transit Reports', 'Gemstone Wisdom']
        },
        {
            title: 'Trikaal Vastu',
            icon: 'hub',
            description: 'The ultimate synchronization of your personal planetary energy with your physical environment.',
            path: '/vastu', // Usually part of Vastu detailed page
            features: ['Personalized Overlay', 'Star-Space Sync', 'Deeper Alignment']
        }
    ];

    return (
        <div className="bg-background text-on-surface min-h-screen">
            <Navbar />
            
            <main className="pt-32 pb-24 px-8">
                <header className="text-center max-w-4xl mx-auto mb-20 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-10"
                    >
                        <span className="text-primary font-label text-sm tracking-[0.3em] uppercase block mb-4">Divine Offerings</span>
                        <h1 className="text-5xl md:text-7xl font-headline font-bold text-primary mb-6">Our Services</h1>
                        <p className="text-on-surface-variant text-lg font-body font-light max-w-2xl mx-auto leading-relaxed">
                            Discover the ancient sciences of energy and time, tailored to your 
                            unique journey and environment.
                        </p>
                    </motion.div>
                </header>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group bg-surface-container-high rounded-2xl p-8 border border-primary/10 hover:border-primary/40 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-primary text-4xl">{service.icon}</span>
                            </div>
                            <h3 className="text-2xl font-headline font-bold text-primary mb-4 relative z-10">{service.title}</h3>
                            <p className="text-on-surface-variant text-sm font-body font-light mb-8 leading-relaxed relative z-10 flex-1">
                                {service.description}
                            </p>
                            <div className="w-full space-y-3 mb-10 relative z-10">
                                {service.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center justify-center gap-2 text-on-surface-variant text-xs font-label">
                                        <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                                        {feature}
                                    </div>
                                ))}
                            </div>
                            <Link 
                                to={service.path}
                                className="w-full py-4 rounded-full border border-primary/30 text-primary font-bold font-label tracking-widest text-xs uppercase hover:bg-primary hover:text-on-primary transition-all relative z-10"
                            >
                                Explore Details
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Additional custom service row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto mt-24 bg-surface-container border border-primary/10 rounded-2xl p-12 flex flex-col lg:flex-row items-center justify-between gap-12"
                >
                    <div className="max-w-2xl">
                        <h3 className="text-3xl font-headline font-bold text-primary mb-4">Bespoke Spiritual Consultation</h3>
                        <p className="text-on-surface-variant font-light text-lg">
                            Looking for something unique? From gemstone selection to site-selection audit for large corporations, we offer customized remedial solutions. 
                        </p>
                    </div>
                    <Link 
                        to="/contact"
                        className="gold-gradient text-on-primary px-10 py-5 rounded-full font-bold shadow-xl hover:scale-105 transition-all text-center"
                    >
                        Custom Inquiry
                    </Link>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default ServicesPage;

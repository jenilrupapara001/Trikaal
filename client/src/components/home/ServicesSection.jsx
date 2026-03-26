import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ServicesSection = () => {
    const services = [
        {
            icon: 'auto_awesome',
            category: 'Vedic Astrology',
            title: 'Trikaal Astrology Consultation',
            path: '/astrology',
            description: 'Decode your star alignments, planetary positions & zodiac to receive personalized guidance for every major life area.',
            points: [
                'Love, Marriage & Family',
                'Career, Business & Income',
                'Health, Property & Legal Matters',
                'Foreign Settlement & Education',
                'Gemstone & Numerology Alignment',
            ]
        },
        {
            icon: 'home_work',
            category: 'Vastu Shastra',
            title: 'Vastu Consultation',
            path: '/vastu',
            description: 'Align the universal energy flow of your living or working space for harmony, prosperity, and lasting peace.',
            points: [
                'Residential & Commercial properties',
                'On-site visits in Gujarat & UAE',
                'Online consultations worldwide',
                'Accurate floor plan analysis',
                'Practical, implementable changes',
            ]
        },
        {
            icon: 'hub',
            category: 'Advanced Vastu',
            title: 'Trikaal Vastu Consultation',
            path: '/vastu',
            description: 'The most advanced form — personalizing your space\'s energy flow as per your unique star alignment and birth chart.',
            points: [
                'Combines Jyotish + Vastu sciences',
                'Personalized to resident birth charts',
                'Residential & Commercial',
                'On-site or online, worldwide',
                'The deepest form of space alignment',
            ]
        }
    ];

    return (
        <section className="bg-background py-32 px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <span className="text-primary font-label text-xs tracking-[0.3em] uppercase block mb-3">
                        What We Offer
                    </span>
                    <h2 className="font-headline text-5xl text-primary font-bold">
                        Our Cosmic Services
                    </h2>
                    <p className="text-on-surface-variant mt-4 max-w-xl mx-auto font-body font-light text-lg">
                        Ancient sciences, applied to your modern life.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="bg-surface-container border border-primary/10 rounded-lg p-10 flex flex-col hover:border-primary/40 transition-all duration-500 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-primary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />

                            <div className="w-16 h-16 rounded-full bg-primary/8 border border-primary/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                                <span className="material-symbols-outlined text-primary text-3xl">{service.icon}</span>
                            </div>

                            <span className="text-primary/60 font-label text-xs tracking-[0.2em] uppercase mb-3 block">
                                {service.category}
                            </span>

                            <h3 className="font-headline text-2xl text-primary font-bold mb-4">{service.title}</h3>

                            <p className="text-on-surface-variant font-body font-light leading-relaxed mb-8 flex-1">
                                {service.description}
                            </p>

                            <ul className="space-y-2 mb-8">
                                {service.points.map((point, j) => (
                                    <li key={j} className="flex items-start gap-3 text-sm text-on-surface-variant/80">
                                        <span className="material-symbols-outlined text-primary text-base mt-0.5 flex-shrink-0">
                                            radio_button_checked
                                        </span>
                                        {point}
                                    </li>
                                ))}
                            </ul>

                            <Link 
                                to={service.path}
                                className="flex items-center gap-2 text-primary font-label text-sm tracking-widest uppercase group-hover:gap-3 transition-all"
                            >
                                Explore Service
                                <span className="material-symbols-outlined text-base">arrow_forward</span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;

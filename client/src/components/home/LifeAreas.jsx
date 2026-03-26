import React from 'react';
import { motion } from 'framer-motion';

const LifeAreas = () => {
    const lifeAreas = [
        { icon: 'favorite',          label: 'Love & Marriage' },
        { icon: 'work',              label: 'Career & Business' },
        { icon: 'payments',          label: 'Money & Investments' },
        { icon: 'home',              label: 'Property Matters' },
        { icon: 'gavel',             label: 'Court & Legal' },
        { icon: 'child_care',        label: 'Progeny & Child' },
        { icon: 'school',            label: 'Education' },
        { icon: 'flight_takeoff',    label: 'Foreign Settlement' },
        { icon: 'health_and_safety', label: 'Health & Inner Peace' },
        { icon: 'diamond',           label: 'Gemstone Guidance' },
        { icon: 'pin',               label: 'Numerology Alignment' },
        { icon: 'casino',            label: 'Lucky Numbers & Colours' },
    ];

    return (
        <section className="bg-surface py-32 px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <span className="text-primary font-label text-xs tracking-[0.3em] uppercase block mb-3">
                        Trikaal Astrology
                    </span>
                    <h2 className="font-headline text-5xl text-primary font-bold">
                        Every Area of Life, Illuminated
                    </h2>
                    <p className="text-on-surface-variant mt-4 max-w-xl mx-auto font-body font-light text-lg">
                        One consultation covers all dimensions of your journey.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {lifeAreas.map((area, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="flex flex-col items-center gap-3 p-6 bg-surface-container-high border border-primary/8 rounded-lg hover:border-primary/30 hover:bg-surface-container transition-all duration-300 group cursor-default"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                                <span className="material-symbols-outlined text-primary text-2xl">{area.icon}</span>
                            </div>
                            <span className="font-label text-xs text-on-surface-variant text-center tracking-wide uppercase">
                                {area.label}
                            </span>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 max-w-2xl mx-auto bg-surface-container-high border border-primary/15 rounded-lg p-8 flex flex-col md:flex-row items-start gap-6 shadow-xl">
                    <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-primary">info</span>
                    </div>
                    <div>
                        <h4 className="font-headline text-primary text-lg mb-3 font-bold">What You'll Need</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
                            {[
                                'Accurate Date of Birth',
                                'Accurate Birth Time',
                                'Birth City / Place',
                                'Gender Preference',
                                'Must be 16 years or older'
                            ].map((req, i) => (
                                <li key={i} className="flex items-center gap-2 text-on-surface-variant text-sm font-body">
                                    <span className="material-symbols-outlined text-primary text-sm flex-shrink-0">check_circle</span>
                                    {req}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LifeAreas;

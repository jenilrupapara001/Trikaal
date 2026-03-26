import React from 'react';
import { motion } from 'framer-motion';

const WhoCanBenefit = () => {
    const items = [
        { icon: 'diversity_3', title: 'For Everyone', desc: 'From students seeking direction to executives charting market cycles.' },
        { icon: 'tune', title: 'Customized Remedies', desc: 'Personalized ritual paths tailored to your unique birth chart.' },
        { icon: 'lock', title: '100% Confidential', desc: 'Your spiritual journey is held in a secure, digital vault.' },
        { icon: 'language', title: 'Global Reach', desc: 'Consultations across all timezones, wherever you stand.' }
    ];

    return (
        <section className="bg-surface py-32 px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-primary font-label tracking-[0.2em] text-xs uppercase">The Cosmic Path</span>
                    <h2 className="font-headline text-5xl text-primary font-bold mt-2">Who Can Benefit?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="bg-surface-container-high border border-primary/10 p-8 rounded-lg hover:border-primary/40 transition-all group"
                        >
                            <div className="mb-6 flex items-center justify-center w-14 h-14 rounded-full bg-primary/5 border border-primary/20 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-primary text-3xl">{item.icon}</span>
                            </div>
                            <h3 className="font-headline text-xl text-primary mb-3">{item.title}</h3>
                            <p className="text-on-surface-variant text-sm leading-relaxed font-light">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhoCanBenefit;

import React from 'react';
import { motion } from 'framer-motion';

const TrustStats = () => {
    const stats = [
        { icon: 'groups',      value: '500+',   label: 'Happy Clients' },
        { icon: 'language',    value: '15+',    label: 'Countries Served' },
        { icon: 'star',        value: '4.9/5',  label: 'Average Rating' },
        { icon: 'lock',        value: '100%',   label: 'Confidential' },
    ];

    return (
        <section className="gold-gradient py-16 px-8 relative overflow-hidden">
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col items-center text-center"
                    >
                        <span className="material-symbols-outlined text-on-primary text-3xl mb-3 opacity-80">
                            {stat.icon}
                        </span>
                        <span className="font-headline text-4xl font-bold text-on-primary mb-1">
                            {stat.value}
                        </span>
                        <span className="font-label text-xs text-on-primary/70 tracking-[0.15em] uppercase font-bold">
                            {stat.label}
                        </span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default TrustStats;

import React from 'react';
import { motion } from 'framer-motion';

const MantraSection = () => {
    const mantra = [
        'ॐ असतो मा सद्गमय ।',
        'तमसो मा ज्योतिर्गमय ।',
        'मृत्योर्मा अमृतं गमय ।',
        'ॐ शान्तिः शान्तिः शान्तिः ॥'
    ];

    const transliteration = [
        'Om Asato Mā Sad-Gamaya',
        'Tamaso Mā Jyotir-Gamaya',
        'Mṛtyor-Mā Amṛtaṃ Gamaya',
        'Om Śāntiḥ Śāntiḥ Śāntiḥ'
    ];

    const meaning = [
        'Lead me from the Unreal to the Real,',
        'Lead me from Darkness to Light,',
        'Lead me from Mortality to Immortality,',
        'Om, Peace, Peace, Peace.'
    ];

    return (
        <section className="bg-surface py-32 px-8 relative overflow-hidden">
            {/* Background decorative mandala — very faint */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '600px' }}>
                    blur_circular
                </span>
            </div>

            <div className="max-w-4xl mx-auto relative z-10 text-center">
                {/* Top label */}
                <span className="text-primary font-label text-xs tracking-[0.3em] uppercase block mb-12">
                    The Pavamana Mantra
                </span>

                {/* Sanskrit lines — large, golden, Devanagari */}
                <div className="space-y-4 mb-10">
                    {mantra.map((line, i) => (
                        <motion.p
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.8 }}
                            className="text-primary text-2xl md:text-3xl lg:text-4xl leading-relaxed"
                            style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                        >
                            {line}
                        </motion.p>
                    ))}
                </div>

                {/* Thin gold divider */}
                <div className="w-24 h-px bg-primary/30 mx-auto mb-10" />

                {/* Transliteration */}
                <div className="space-y-1 mb-10">
                    {transliteration.map((line, i) => (
                        <p key={i} className="text-on-surface-variant/60 font-label text-sm tracking-[0.15em] italic">
                            {line}
                        </p>
                    ))}
                </div>

                {/* Thin gold divider */}
                <div className="w-24 h-px bg-primary/30 mx-auto mb-10" />

                {/* English meaning — 4 lines with stagger */}
                <div className="space-y-3">
                    {meaning.map((line, i) => (
                        <motion.p
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 + i * 0.1 }}
                            className="text-on-surface-variant text-base md:text-lg font-body font-light"
                        >
                            {line}
                        </motion.p>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MantraSection;

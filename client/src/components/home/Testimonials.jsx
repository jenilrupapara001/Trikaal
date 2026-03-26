import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Priya S.',
            location: 'Dubai, UAE',
            service: 'Trikaal Astrology',
            rating: 5,
            text: 'Smeet\'s reading was incredibly accurate. The guidance I received about my career transition proved to be spot on. Highly recommend to anyone seeking clarity.'
        },
        {
            name: 'Rahul M.',
            location: 'Ahmedabad, India',
            service: 'Trikaal Vastu',
            rating: 5,
            text: 'After the Trikaal Vastu consultation and implementing the suggested changes, there has been a remarkable positive shift in our home\'s energy and our family\'s wellbeing.'
        },
        {
            name: 'Ananya K.',
            location: 'London, UK',
            service: 'Vastu Consultation',
            rating: 5,
            text: 'The online Vastu consultation was seamless. Smeet provided detailed, practical recommendations that we could actually implement. The difference has been tangible.'
        }
    ];

    return (
        <section className="bg-surface py-32 px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <span className="text-primary font-label text-xs tracking-[0.3em] uppercase block mb-3">
                        Client Stories
                    </span>
                    <h2 className="font-headline text-5xl text-primary font-bold">
                        What Our Clients Say
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-surface-container-high border border-primary/10 rounded-lg p-8 flex flex-col hover:border-primary/30 transition-all duration-500 group"
                        >
                            {/* Stars */}
                            <div className="flex items-center gap-1 mb-6">
                                {[...Array(5)].map((_, j) => (
                                    <span key={j} className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        star
                                    </span>
                                ))}
                            </div>

                            {/* Quote icon */}
                            <span className="material-symbols-outlined text-primary/20 text-5xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
                                format_quote
                            </span>

                            {/* Text */}
                            <p className="text-on-surface-variant font-body font-light leading-relaxed flex-1 mb-6 italic opacity-80">
                                "{t.text}"
                            </p>

                            {/* Divider */}
                            <div className="w-full h-px bg-primary/10 mb-6" />

                            {/* Author */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="font-headline text-primary font-bold block">{t.name}</span>
                                    <span className="text-on-surface-variant/50 text-[10px] font-label flex items-center gap-1 mt-1 uppercase tracking-widest">
                                        <span className="material-symbols-outlined text-[10px]">location_on</span>
                                        {t.location}
                                    </span>
                                </div>
                                <span className="px-3 py-1 rounded-full border border-primary/15 text-primary/60 font-label text-[10px] uppercase tracking-tighter">
                                    {t.service}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

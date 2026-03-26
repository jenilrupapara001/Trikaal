import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
    const steps = [
        {
            number: '01',
            icon: 'checklist',
            title: 'Choose Your Service',
            description: 'Select from Trikaal Astrology, Vastu, or Trikaal Vastu consultation based on your need.'
        },
        {
            number: '02',
            icon: 'person_edit',
            title: 'Share Your Details',
            description: 'Provide your accurate birth date, time, city, and gender. For Vastu, share your property floor plan.'
        },
        {
            number: '03',
            icon: 'forum',
            title: 'Receive Your Reading',
            description: 'Connect via audio call, video call, or in-person meet. Get your personalized analysis and remedies.'
        },
        {
            number: '04',
            icon: 'trending_up',
            title: 'Transform Your Life',
            description: 'Implement your customized remedies and begin your journey toward clarity, harmony, and abundance.'
        }
    ];

    return (
        <section className="bg-surface py-32 px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <span className="text-primary font-label text-xs tracking-[0.3em] uppercase block mb-3">
                        The Process
                    </span>
                    <h2 className="font-headline text-5xl text-primary font-bold">
                        Your Journey to Clarity
                    </h2>
                </div>

                <div className="relative">
                    {/* Connecting dashed line — desktop only */}
                    <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px border-t border-dashed border-primary/20" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="flex flex-col items-center text-center group"
                            >
                                {/* Step number circle */}
                                <div className="relative mb-6">
                                    <div className="w-20 h-20 rounded-full border border-primary/30 bg-surface-container flex items-center justify-center group-hover:border-primary/60 transition-colors duration-500">
                                        <span className="material-symbols-outlined text-primary text-3xl">{step.icon}</span>
                                    </div>
                                    {/* Step number badge */}
                                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full gold-gradient flex items-center justify-center font-label text-xs font-bold text-on-primary">
                                        {step.number}
                                    </span>
                                </div>
                                <h3 className="font-headline text-xl text-primary font-bold mb-3">{step.title}</h3>
                                <p className="text-on-surface-variant text-sm font-body font-light leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;

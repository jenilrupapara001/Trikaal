import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FinalCTA = () => {
    return (
        <section className="bg-surface py-32 px-8 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[600px] h-[600px] bg-primary/8 rounded-full blur-[150px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center relative z-10"
            >
                <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8 animate-pulse">
                    <span className="material-symbols-outlined text-primary text-4xl">
                        auto_awesome
                    </span>
                </div>
                
                <h2 className="font-headline text-5xl md:text-6xl text-primary font-bold mb-8 leading-tight">
                    Begin Your <br/><span className="italic font-normal">Cosmic Journey</span>
                </h2>
                
                <p className="text-on-surface-variant text-lg md:text-xl font-body font-light mb-12 leading-relaxed max-w-xl mx-auto">
                    Take the first step toward clarity, harmony, and purpose. 
                    Book a consultation with Smeet today.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link 
                        to="/booking"
                        className="w-full sm:w-auto gold-gradient text-on-primary px-12 py-5 rounded-full font-bold text-lg hover:scale-105 inline-flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(230,195,100,0.3)] transition-all group"
                    >
                        <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">calendar_month</span>
                        Book a Consultation
                    </Link>
                    <Link 
                        to="/contact"
                        className="w-full sm:w-auto px-12 py-5 rounded-full border border-primary/20 text-primary font-bold text-lg hover:bg-primary/10 transition-all inline-flex items-center justify-center gap-4 text-center"
                    >
                        <span className="material-symbols-outlined">chat</span>
                        Get in Touch
                    </Link>
                </div>
                
                <p className="text-on-surface-variant/30 text-xs mt-12 font-label uppercase tracking-widest font-bold">
                    Available worldwide online · In-person in Gujarat & UAE
                </p>
            </motion.div>
        </section>
    );
};

export default FinalCTA;

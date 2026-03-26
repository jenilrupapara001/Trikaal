import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-32 px-6 overflow-hidden">
            <style>{`
                .star-field::before,
                .star-field::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: 
                    radial-gradient(1px 1px at 10% 15%, rgba(201,168,76,0.6) 0%, transparent 100%),
                    radial-gradient(1px 1px at 30% 45%, rgba(201,168,76,0.4) 0%, transparent 100%),
                    radial-gradient(1.5px 1.5px at 50% 25%, rgba(201,168,76,0.5) 0%, transparent 100%),
                    radial-gradient(1px 1px at 70% 60%, rgba(201,168,76,0.3) 0%, transparent 100%),
                    radial-gradient(1px 1px at 85% 10%, rgba(201,168,76,0.6) 0%, transparent 100%),
                    radial-gradient(1px 1px at 20% 80%, rgba(201,168,76,0.4) 0%, transparent 100%),
                    radial-gradient(1.5px 1.5px at 60% 85%, rgba(201,168,76,0.5) 0%, transparent 100%),
                    radial-gradient(1px 1px at 90% 40%, rgba(201,168,76,0.3) 0%, transparent 100%),
                    radial-gradient(1px 1px at 45% 55%, rgba(201,168,76,0.4) 0%, transparent 100%),
                    radial-gradient(1px 1px at 75% 90%, rgba(201,168,76,0.6) 0%, transparent 100%);
                }
                .star-field::after {
                    animation: twinkle 4s ease-in-out infinite alternate;
                    opacity: 0.5;
                }
                @keyframes twinkle {
                    from { opacity: 0.3; transform: scale(1); }
                    to   { opacity: 0.7; transform: scale(1.02); }
                }
            `}</style>

            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="star-field absolute inset-0 opacity-40"></div>
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/8 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center max-w-4xl mx-auto"
            >
                <div className="mb-8 flex flex-col items-center">
                    <span className="text-primary font-headline italic text-3xl md:text-4xl mb-6 block tracking-[0.2em]">
                        ॐ असतो मा सद्गमय
                    </span>
                    <div className="space-y-1 text-on-surface-variant/80 text-sm md:text-base font-light tracking-widest uppercase">
                        <p>Asato mā sadgamaya</p>
                        <p>Tamaso mā jyotirgamaya</p>
                    </div>
                </div>

                <h1 className="text-primary font-headline text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight">
                    A Modern Approach to <br />
                    <span className="italic font-normal">Vedic Science</span>
                </h1>

                <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto mb-12 font-body font-light leading-relaxed">
                    Decode your destiny through the ancient wisdom of Jyotish & Vastu Shastra.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link 
                        to="/services"
                        className="w-full sm:w-auto gold-gradient text-on-primary px-10 py-4 rounded-full font-bold text-lg hover:scale-105 shadow-xl transition-all text-center"
                    >
                        Explore Services
                    </Link>
                    <Link 
                        to="/booking"
                        className="w-full sm:w-auto px-10 py-4 rounded-full border border-primary/20 text-primary font-bold text-lg hover:bg-primary/10 transition-all text-center"
                    >
                        Book a Session
                    </Link>
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mt-16 flex flex-col items-center gap-2 text-on-surface-variant/40"
                >
                    <span className="font-label text-xs tracking-[0.3em] uppercase">Scroll to Explore</span>
                    <span className="material-symbols-outlined text-primary/40">keyboard_arrow_down</span>
                </motion.div>
            </motion.div>
        </main>
    );
};

export default HeroSection;

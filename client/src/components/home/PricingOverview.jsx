import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PricingOverview = () => {
    return (
        <section className="bg-background py-32 px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <span className="text-primary font-label text-xs tracking-[0.3em] uppercase block mb-3">
                        Transparent Pricing
                    </span>
                    <h2 className="font-headline text-5xl text-primary font-bold">
                        Investment in Your Destiny
                    </h2>
                    <p className="text-on-surface-variant mt-4 max-w-xl mx-auto font-body font-light text-lg">
                        All consultations are per person. Fees are in <span className="text-primary font-bold">AED (UAE Dirham)</span>.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Card 1: Trikaal Astrology */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-surface-container border border-primary/15 rounded-lg overflow-hidden flex flex-col h-full"
                    >
                        <div className="p-8 border-b border-primary/10 bg-surface-container-high/50">
                            <span className="material-symbols-outlined text-primary text-3xl mb-4 block">auto_awesome</span>
                            <h3 className="font-headline text-2xl text-primary font-bold">Trikaal Astrology</h3>
                            <p className="text-on-surface-variant text-sm mt-2 font-light italic">Per person · Audio / Video / In-Person</p>
                        </div>
                        <div className="p-8 flex-1 space-y-8">
                            <div className="mb-6">
                                <span className="font-label text-[10px] text-primary/60 tracking-[0.2em] uppercase block mb-4 border-b border-primary/10 pb-2">
                                    Regular · After 5 Working Days
                                </span>
                                <div className="space-y-3">
                                    {[
                                        { mode: 'Audio Call', duration: '30 Min', price: 'AED 150' },
                                        { mode: 'Audio Call', duration: '60 Min', price: 'AED 250' },
                                        { mode: 'Video Call', duration: '30 Min', price: 'AED 300' },
                                        { mode: 'Video Call', duration: '60 Min', price: 'AED 550' },
                                        { mode: 'In-Person',  duration: '—',      price: 'AED 1,000' },
                                    ].map((row, i) => (
                                        <div key={i} className="flex items-center justify-between py-2 border-b border-primary/5 last:border-0">
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-primary/50 text-base">
                                                    {row.mode === 'Audio Call' ? 'call' : row.mode === 'Video Call' ? 'videocam' : 'location_on'}
                                                </span>
                                                <div>
                                                    <span className="text-on-surface-variant text-sm block leading-none mb-1">{row.mode}</span>
                                                    {row.duration !== '—' && (
                                                        <span className="text-on-surface-variant/40 text-[10px] uppercase font-bold tracking-tighter">⏱ {row.duration}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-primary font-headline font-bold text-base">{row.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Urgent pricing */}
                            <div className="bg-primary/5 border border-primary/15 rounded-lg p-6 shadow-inner">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-primary text-base">bolt</span>
                                    <span className="font-label text-xs text-primary tracking-[0.2em] uppercase font-bold">
                                        Urgent · Within 1 Working Day
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { mode: 'Audio Call', duration: '30 Min', price: 'AED 250' },
                                        { mode: 'Audio Call', duration: '60 Min', price: 'AED 350' },
                                        { mode: 'Video Call', duration: '30 Min', price: 'AED 500' },
                                        { mode: 'Video Call', duration: '60 Min', price: 'AED 700' },
                                        { mode: 'In-Person',  duration: '—',      price: 'AED 1,500' },
                                    ].map((row, i) => (
                                        <div key={i} className="flex justify-between items-center py-1">
                                            <span className="text-on-surface-variant text-xs">{row.mode} {row.duration !== '—' ? `· ${row.duration}` : ''}</span>
                                            <span className="text-primary font-headline font-bold text-sm tracking-tight">{row.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2: Vastu Consultation */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-surface-container border border-primary/15 rounded-lg overflow-hidden flex flex-col h-full"
                    >
                        <div className="p-8 border-b border-primary/10 bg-surface-container-high/50">
                            <span className="material-symbols-outlined text-primary text-3xl mb-4 block">home_work</span>
                            <h3 className="font-headline text-2xl text-primary font-bold">Vastu Consultation</h3>
                            <p className="text-on-surface-variant text-sm mt-2 font-light italic">Per property · On-Site or Online</p>
                        </div>
                        <div className="p-8 space-y-10 flex-1">
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                                    <span className="font-label text-xs text-primary/60 tracking-[0.2em] uppercase font-bold border-b border-primary/10 pb-1 w-full">
                                        On-Site · Gujarat & UAE Only
                                    </span>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { type: 'Residential Property', price: 'AED 7,000' },
                                        { type: 'Commercial Property',  price: 'AED 10,000' },
                                    ].map((row, i) => (
                                        <div key={i} className="flex justify-between items-center py-3 px-4 bg-background/30 rounded-lg border border-primary/5">
                                            <span className="text-on-surface-variant text-sm font-medium">{row.type}</span>
                                            <span className="text-primary font-headline font-bold text-lg">{row.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="material-symbols-outlined text-primary text-lg">public</span>
                                    <span className="font-label text-xs text-primary/60 tracking-[0.2em] uppercase font-bold border-b border-primary/10 pb-1 w-full">
                                        Online Consultation · Worldwide
                                    </span>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { type: 'Residential Property', price: 'AED 5,000' },
                                        { type: 'Commercial Property',  price: 'AED 7,000' },
                                    ].map((row, i) => (
                                        <div key={i} className="flex justify-between items-center py-3 px-4 bg-background/30 rounded-lg border border-primary/5">
                                            <span className="text-on-surface-variant text-sm font-medium">{row.type}</span>
                                            <span className="text-primary font-headline font-bold text-lg">{row.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 3: Trikaal Vastu */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-surface-container border border-primary/15 rounded-lg overflow-hidden flex flex-col h-full ring-2 ring-primary/20 scale-[1.02] shadow-2xl z-10"
                    >
                        <div className="p-8 border-b border-primary/10 bg-primary/5 relative">
                            <span className="absolute top-4 right-4 bg-primary text-on-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">Advanced</span>
                            <span className="material-symbols-outlined text-primary text-3xl mb-4 block">hub</span>
                            <h3 className="font-headline text-2xl text-primary font-bold">Trikaal Vastu</h3>
                            <p className="text-on-surface-variant text-sm mt-2 font-light italic">Birth-Chart Personalized Alignment</p>
                        </div>
                        <div className="p-8 space-y-10 flex-1">
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                                    <span className="font-label text-xs text-primary/60 tracking-[0.2em] uppercase font-bold border-b border-primary/10 pb-1 w-full">
                                        On-Site · Gujarat & UAE Only
                                    </span>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { type: 'Residential / Birth-Synced', price: 'AED 7,000' },
                                        { type: 'Commercial / Birth-Synced',  price: 'AED 10,000' },
                                    ].map((row, i) => (
                                        <div key={i} className="flex justify-between items-center py-3 px-4 bg-primary/5 rounded-lg border border-primary/10">
                                            <span className="text-on-surface-variant text-sm font-medium">{row.type}</span>
                                            <span className="text-primary font-headline font-bold text-lg">{row.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="material-symbols-outlined text-primary text-lg">public</span>
                                    <span className="font-label text-xs text-primary/60 tracking-[0.2em] uppercase font-bold border-b border-primary/10 pb-1 w-full">
                                        Online Consultation · Worldwide
                                    </span>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { type: 'Residential / Birth-Synced', price: 'AED 5,000' },
                                        { type: 'Commercial / Birth-Synced',  price: 'AED 7,000' },
                                    ].map((row, i) => (
                                        <div key={i} className="flex justify-between items-center py-3 px-4 bg-primary/5 rounded-lg border border-primary/10">
                                            <span className="text-on-surface-variant text-sm font-medium">{row.type}</span>
                                            <span className="text-primary font-headline font-bold text-lg">{row.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <p className="text-[10px] text-primary/60 font-medium italic mt-4 text-center">
                                + AED 150 per person's chart analysis included in final quote.
                            </p>
                        </div>
                    </motion.div>
                </div>

                <p className="text-center text-on-surface-variant/40 text-sm mt-16 font-light max-w-xl mx-auto italic leading-relaxed">
                    All fees are for consultation & analysis only. 
                    In-person sessions available in Gujarat, India & UAE. 
                    Worldwide consultations via secure video link. 
                </p>

                <div className="text-center mt-12">
                    <Link 
                        to="/booking"
                        className="gold-gradient text-on-primary px-12 py-5 rounded-full font-bold text-xl hover:scale-105 inline-flex items-center gap-4 shadow-[0_15px_45px_rgba(230,195,100,0.25)] transition-all group"
                    >
                        <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">calendar_month</span>
                        Secure Your Session
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PricingOverview;

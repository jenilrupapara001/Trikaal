import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = 'http://localhost:5001/api';

const BookingPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'
    const [fieldErrors, setFieldErrors] = useState({});
    const [formData, setFormData] = useState({
        service: 'astrology', // 'astrology' | 'vastu' | 'trikaal-vastu' | 'gemstone'
        type: 'regular',      // 'regular' | 'urgent'
        mode: 'video',       // 'audio' | 'video' | 'in-person'
        duration: '30',       // '30' | '60' | 'full'
        propertyType: 'residential', // 'residential' | 'commercial'

        // Personal
        name: '',
        email: '',
        phone: '',
        gender: 'male',
        age: '',

        // Birth (Astro/Trikaal)
        birthDate: '',
        birthTime: '',
        birthCity: '',

        // Vastu (Vastu/Trikaal)
        address: '',
        propertyDetails: '',

        notes: '',
        agreeToTerms: false
    });

    const isAstroRelated = formData.service === 'astrology' || formData.service === 'trikaal-vastu';
    const isVastuRelated = formData.service === 'vastu' || formData.service === 'trikaal-vastu';

    // PRICING LOGIC
    const calculatePrice = useMemo(() => {
        const { service, type, mode, duration, propertyType } = formData;

        if (service === 'astrology') {
            const prices = {
                regular: { audio: { 30: 150, 60: 250 }, video: { 30: 300, 60: 550 }, 'in-person': 1000 },
                urgent: { audio: { 30: 250, 60: 350 }, video: { 30: 500, 60: 700 }, 'in-person': 1500 }
            };
            if (mode === 'in-person') return prices[type][mode];
            return prices[type][mode][duration];
        }

        if (service === 'vastu') {
            const prices = {
                online: { residential: 5000, commercial: 7000 },
                'in-person': { residential: 7000, commercial: 10000 }
            };
            const vastuMode = mode === 'in-person' ? 'in-person' : 'online';
            return prices[vastuMode][propertyType];
        }

        if (service === 'trikaal-vastu') {
            const basePrices = {
                online: { residential: 5000, commercial: 7000 },
                'in-person': { residential: 7000, commercial: 10000 }
            };
            const vastuMode = mode === 'in-person' ? 'in-person' : 'online';
            // Base + AED 150 per person (estimating 1 person for base calculation, logic can be expanded)
            return basePrices[vastuMode][propertyType] + 150;
        }

        if (service === 'gemstone') {
            return type === 'regular' ? 300 : 500;
        }

        return 0;
    }, [formData]);

    const handleNext = () => {
        // Validate step 1 (service) - always valid
        if (step === 1) {
            setStep(step + 1);
            return;
        }

        // Validate step 2 (settings) - always valid
        if (step === 2) {
            setStep(step + 1);
            return;
        }

        // Validate step 3 (intake form)
        if (step === 3) {
            const errors = {};

            // Required: Personal info
            if (!formData.name.trim()) errors.name = 'Name is required';
            if (!formData.email.trim()) errors.email = 'Email is required';
            else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Enter a valid email';
            if (!formData.phone.trim()) errors.phone = 'Phone number is required';

            // Required: Birth details for astrology/trikaal
            if (isAstroRelated) {
                if (!formData.birthDate) errors.birthDate = 'Birth date is required';
                if (!formData.birthTime) errors.birthTime = 'Birth time is required';
                if (!formData.birthCity.trim()) errors.birthCity = 'Birth city is required';
            }

            // Required: Address for vastu/trikaal
            if (isVastuRelated) {
                if (!formData.address.trim()) errors.address = 'Address is required';
            }

            if (Object.keys(errors).length > 0) {
                setFieldErrors(errors);
                return;
            }

            setFieldErrors({});
            setStep(step + 1);
            return;
        }

        setStep(step + 1);
    };
    const handlePrev = () => setStep(step - 1);

    const steps = [
        { title: 'Service', icon: 'category' },
        { title: 'Setting', icon: 'tune' },
        { title: 'Intake', icon: 'person_edit' },
        { title: 'Review', icon: 'check_circle' },
    ];

    return (
        <div className="bg-background text-on-surface min-h-screen selection:bg-primary/30">
            <Navbar />

            <main className="pt-32 pb-24 px-6 md:px-12">
                <header className="text-center max-w-4xl mx-auto mb-16 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-[130px] pointer-events-none" />
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
                        <span className="text-primary font-label text-sm tracking-[0.3em] uppercase block mb-4">Celestial Alignment</span>
                        <h1 className="text-5xl md:text-6xl font-headline font-bold text-primary mb-6">Booking Portal</h1>
                        <p className="text-on-surface-variant text-lg font-body font-light max-w-2xl mx-auto leading-relaxed">
                            Complete the fields below to schedule your consultation with Smeet.
                            Your journey towards cosmic harmony begins here.
                        </p>
                    </motion.div>
                </header>

                <div className="max-w-4xl mx-auto">
                    {/* Stepper Navigation */}
                    <div className="flex items-center justify-between mb-16 px-4 md:px-10 relative">
                        <div className="absolute top-1/2 left-10 right-10 h-px bg-primary/10 -translate-y-1/2 z-0" />
                        {steps.map((s, i) => (
                            <div key={i} className="flex flex-col items-center gap-3 relative z-10">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${step > i + 1 ? 'gold-gradient border-transparent text-on-primary shadow-lg shadow-primary/20' :
                                    step === i + 1 ? 'border-primary bg-primary/10 text-primary scale-110 shadow-lg' :
                                        'border-primary/15 bg-surface-container text-on-surface-variant/40'
                                    }`}>
                                    <span className="material-symbols-outlined text-xl">{step > i + 1 ? 'check' : s.icon}</span>
                                </div>
                                <span className={`font-label text-[10px] uppercase tracking-widest ${step === i + 1 ? 'text-primary font-bold' : 'text-on-surface-variant/40'}`}>
                                    {s.title}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="glass-card rounded-2xl border border-primary/10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row">
                        <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none" />

                        {/* Summary Sidebar (Desktop) */}
                        <div className="w-full md:w-72 bg-surface-container-high/50 border-r border-primary/10 p-8 relative z-10">
                            <h4 className="text-primary font-headline font-bold text-sm uppercase tracking-widest mb-6 border-b border-primary/10 pb-4">Order Summary</h4>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] uppercase text-on-surface-variant/60 tracking-wider mb-1">Service</p>
                                    <p className="text-sm font-headline text-primary capitalize">{formData.service.replace('-', ' ')}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase text-on-surface-variant/60 tracking-wider mb-1">Mode & Priority</p>
                                    <p className="text-sm text-on-surface capitalize">{formData.mode.replace('-', ' ')} · {formData.type}</p>
                                </div>
                                <div className="pt-6 border-t border-primary/10">
                                    <p className="text-[10px] uppercase text-on-surface-variant/60 tracking-wider mb-1">Total Fee</p>
                                    <p className="text-3xl font-headline font-bold text-primary">AED {calculatePrice.toLocaleString()}</p>
                                    <p className="text-[9px] text-on-surface-variant/50 mt-1 uppercase italic leading-tight">Prices subject to terms & conditions.</p>
                                </div>
                            </div>

                            <div className="mt-12 p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary text-sm mt-0.5">verified_user</span>
                                <p className="text-[10px] text-on-surface-variant leading-relaxed">Your data is encrypted and kept 100% confidential.</p>
                            </div>
                        </div>

                        {/* Main Interaction Area */}
                        <div className="flex-1 p-8 md:p-12 relative z-10 min-h-[500px] flex flex-col">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div key="st1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                                        <h2 className="text-2xl font-headline font-bold text-primary mb-2">Identify Your Path</h2>
                                        <p className="text-on-surface-variant text-sm mb-10 font-light">Which sacred science do you seek guidance in?</p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {[
                                                { id: 'astrology', name: 'Trikaal Astrology', icon: 'auto_awesome', desc: 'Birth chart decoding' },
                                                { id: 'vastu', name: 'Vastu Consultation', icon: 'home_work', desc: 'Spatial energy alignment' },
                                                { id: 'trikaal-vastu', name: 'Trikaal Vastu', icon: 'hub', desc: 'Personalized Astro-Vastu' },
                                                { id: 'gemstone', name: 'Gemstone Advice', icon: 'diamond', desc: 'Mineral synchronization' }
                                            ].map((svc) => (
                                                <button
                                                    key={svc.id}
                                                    onClick={() => setFormData({ ...formData, service: svc.id })}
                                                    className={`p-6 rounded-2xl border text-left transition-all duration-300 group ${formData.service === svc.id
                                                        ? 'bg-primary/10 border-primary shadow-inner'
                                                        : 'bg-surface-container/50 border-primary/10 hover:border-primary/40'
                                                        }`}
                                                >
                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${formData.service === svc.id ? 'bg-primary text-on-primary' : 'bg-primary/5 text-primary'
                                                        }`}>
                                                        <span className="material-symbols-outlined text-2xl">{svc.icon}</span>
                                                    </div>
                                                    <h3 className={`font-headline font-bold mb-1 ${formData.service === svc.id ? 'text-primary' : 'text-on-surface'}`}>{svc.name}</h3>
                                                    <p className="text-[11px] text-on-surface-variant/60 font-light">{svc.desc}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div key="st2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                                        <h2 className="text-2xl font-headline font-bold text-primary mb-2">Configure Consultation</h2>
                                        <p className="text-on-surface-variant text-sm mb-10 font-light">Choose your preferred mode and level of urgency.</p>

                                        <div className="space-y-10">
                                            {/* Priority Toggle */}
                                            <div>
                                                <label className="block text-primary font-label text-[10px] uppercase tracking-widest mb-4">Priority Level</label>
                                                <div className="flex bg-surface-container rounded-full p-1 border border-primary/10">
                                                    {[
                                                        { id: 'regular', name: 'Regular', sub: 'preparation in 5 days' },
                                                        { id: 'urgent', name: 'Urgent', sub: 'within 24 hours' }
                                                    ].map((t) => (
                                                        <button
                                                            key={t.id}
                                                            onClick={() => setFormData({ ...formData, type: t.id })}
                                                            className={`flex-1 py-3 px-6 rounded-full text-center group transition-all duration-500 ${formData.type === t.id ? 'gold-gradient text-on-primary shadow-lg' : 'text-on-surface-variant hover:text-primary'
                                                                }`}
                                                        >
                                                            <span className="block text-xs font-bold uppercase tracking-widest">{t.name}</span>
                                                            <span className={`text-[9px] font-light italic ${formData.type === t.id ? 'text-on-primary/70' : 'text-on-surface-variant/40 group-hover:text-primary/70'}`}>{t.sub}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Mode Selection */}
                                            <div>
                                                <label className="block text-primary font-label text-[10px] uppercase tracking-widest mb-4">Consultation Format</label>
                                                <div className="grid grid-cols-3 gap-3">
                                                    {[
                                                        { id: 'audio', name: 'Audio', icon: 'call' },
                                                        { id: 'video', name: 'Video', icon: 'videocam' },
                                                        { id: 'in-person', name: 'In-Person', icon: 'location_on' }
                                                    ].map((m) => (
                                                        <button
                                                            key={m.id}
                                                            onClick={() => setFormData({ ...formData, mode: m.id })}
                                                            className={`flex flex-col items-center py-5 rounded-xl border transition-all ${formData.mode === m.id ? 'bg-primary/10 border-primary text-primary' : 'bg-surface-container/30 border-primary/10 text-on-surface-variant hover:border-primary/40'
                                                                }`}
                                                        >
                                                            <span className="material-symbols-outlined mb-2 text-2xl">{m.icon}</span>
                                                            <span className="text-[10px] font-bold uppercase tracking-widest">{m.name}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                                {formData.mode === 'in-person' && (
                                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-[10px] text-primary/60 italic">Available in Gujarat (India) & UAE only.</motion.p>
                                                )}
                                            </div>

                                            {/* Conditional Sub-settings: Duration for Astro, Property for Vastu */}
                                            {isAstroRelated && formData.mode !== 'in-person' && (
                                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                                    <label className="block text-primary font-label text-[10px] uppercase tracking-widest mb-4">Session Duration</label>
                                                    <div className="flex gap-4">
                                                        {['30', '60'].map((d) => (
                                                            <button
                                                                key={d}
                                                                onClick={() => setFormData({ ...formData, duration: d })}
                                                                className={`flex-1 py-4 px-6 rounded-xl border transition-all text-sm font-headline ${formData.duration === d ? 'border-primary bg-primary/10 text-primary font-bold' : 'border-primary/10 text-on-surface-variant'
                                                                    }`}
                                                            >
                                                                {d} Minutes
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}

                                            {isVastuRelated && (
                                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                                    <label className="block text-primary font-label text-[10px] uppercase tracking-widest mb-4">Property Classification</label>
                                                    <div className="flex gap-4">
                                                        {['residential', 'commercial'].map((p) => (
                                                            <button
                                                                key={p}
                                                                onClick={() => setFormData({ ...formData, propertyType: p })}
                                                                className={`flex-1 py-4 px-6 rounded-xl border transition-all text-xs font-bold uppercase tracking-widest ${formData.propertyType === p ? 'border-primary bg-primary/10 text-primary shadow-sm' : 'border-primary/10 text-on-surface-variant'
                                                                    }`}
                                                            >
                                                                {p}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div key="st3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                                        <h2 className="text-2xl font-headline font-bold text-primary mb-2">Detailed Intake</h2>
                                        <p className="text-on-surface-variant text-sm mb-10 font-light">Accurate information ensures a precise celestial mapping.</p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            {/* Personal Fields Always Present */}
                                            <div className="sm:col-span-2 space-y-4">
                                                <label className="block text-primary font-label text-[10px] uppercase tracking-widest mb-2">Subject Information</label>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <input
                                                        type="text" placeholder="Full Name of Subject"
                                                        value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value }); if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' }); }}
                                                        className={`w-full bg-surface-container/50 border rounded-xl py-4 px-6 text-on-surface focus:border-primary/40 outline-none transition-all placeholder:text-on-surface-variant/30 text-sm ${fieldErrors.name ? 'border-red-500' : 'border-primary/10'}`}
                                                    />
                                                    {fieldErrors.name && <p className="text-red-400 text-xs mt-1">{fieldErrors.name}</p>}
                                                    <input
                                                        type="email" placeholder="Email Address"
                                                        value={formData.email} onChange={(e) => { setFormData({ ...formData, email: e.target.value }); if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' }); }}
                                                        className={`w-full bg-surface-container/50 border rounded-xl py-4 px-6 text-on-surface focus:border-primary/40 outline-none transition-all placeholder:text-on-surface-variant/30 text-sm ${fieldErrors.email ? 'border-red-500' : 'border-primary/10'}`}
                                                    />
                                                    {fieldErrors.email && <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>}
                                                    <input
                                                        type="tel" placeholder="Phone Number"
                                                        value={formData.phone} onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: '' }); }}
                                                        className={`w-full bg-surface-container/50 border rounded-xl py-4 px-6 text-on-surface focus:border-primary/40 outline-none transition-all placeholder:text-on-surface-variant/30 text-sm ${fieldErrors.phone ? 'border-red-500' : 'border-primary/10'}`}
                                                    />
                                                    {fieldErrors.phone && <p className="text-red-400 text-xs mt-1">{fieldErrors.phone}</p>}
                                                </div>
                                            </div>

                                            {/* Conditional Birth Details */}
                                            {isAstroRelated && (
                                                <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-primary/5">
                                                    <div className="sm:col-span-3">
                                                        <label className="block text-primary font-label text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2">
                                                            <span className="material-symbols-outlined text-sm">auto_awesome</span>
                                                            Birth Credentials
                                                        </label>
                                                    </div>
                                                    <input
                                                        type="date"
                                                        value={formData.birthDate} onChange={(e) => { setFormData({ ...formData, birthDate: e.target.value }); if (fieldErrors.birthDate) setFieldErrors({ ...fieldErrors, birthDate: '' }); }}
                                                        className={`w-full bg-surface-container/50 border rounded-xl py-4 px-6 text-on-surface focus:border-primary/40 outline-none transition-all text-sm ${fieldErrors.birthDate ? 'border-red-500' : 'border-primary/10'}`}
                                                    />
                                                    {fieldErrors.birthDate && <p className="text-red-400 text-xs mt-1">{fieldErrors.birthDate}</p>}
                                                    <input
                                                        type="time"
                                                        value={formData.birthTime} onChange={(e) => { setFormData({ ...formData, birthTime: e.target.value }); if (fieldErrors.birthTime) setFieldErrors({ ...fieldErrors, birthTime: '' }); }}
                                                        className={`w-full bg-surface-container/50 border rounded-xl py-4 px-6 text-on-surface focus:border-primary/40 outline-none transition-all text-sm ${fieldErrors.birthTime ? 'border-red-500' : 'border-primary/10'}`}
                                                    />
                                                    {fieldErrors.birthTime && <p className="text-red-400 text-xs mt-1">{fieldErrors.birthTime}</p>}
                                                    <input
                                                        type="text" placeholder="Birth City"
                                                        value={formData.birthCity} onChange={(e) => { setFormData({ ...formData, birthCity: e.target.value }); if (fieldErrors.birthCity) setFieldErrors({ ...fieldErrors, birthCity: '' }); }}
                                                        className={`w-full bg-surface-container/50 border rounded-xl py-4 px-6 text-on-surface focus:border-primary/40 outline-none transition-all text-sm placeholder:text-on-surface-variant/30 ${fieldErrors.birthCity ? 'border-red-500' : 'border-primary/10'}`}
                                                    />
                                                    {fieldErrors.birthCity && <p className="text-red-400 text-xs mt-1">{fieldErrors.birthCity}</p>}
                                                </div>
                                            )}

                                            {/* Conditional Vastu Details */}
                                            {isVastuRelated && (
                                                <div className="sm:col-span-2 space-y-4 pt-6 mt-6 border-t border-primary/5">
                                                    <label className="block text-primary font-label text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2">
                                                        <span className="material-symbols-outlined text-sm">home_work</span>
                                                        Property Site Information
                                                    </label>
                                                    <input
                                                        type="text" placeholder="Full Location Address / City"
                                                        value={formData.address} onChange={(e) => { setFormData({ ...formData, address: e.target.value }); if (fieldErrors.address) setFieldErrors({ ...fieldErrors, address: '' }); }}
                                                        className={`w-full bg-surface-container/50 border rounded-xl py-4 px-6 text-on-surface focus:border-primary/40 outline-none transition-all text-sm placeholder:text-on-surface-variant/30 ${fieldErrors.address ? 'border-red-500' : 'border-primary/10'}`}
                                                    />
                                                    {fieldErrors.address && <p className="text-red-400 text-xs mt-1">{fieldErrors.address}</p>}
                                                    <textarea
                                                        placeholder="Brief property description (BHK, Floor etc)"
                                                        value={formData.propertyDetails} onChange={(e) => setFormData({ ...formData, propertyDetails: e.target.value })}
                                                        rows={2}
                                                        className="w-full bg-surface-container/50 border border-primary/10 rounded-xl py-4 px-6 text-on-surface focus:border-primary/40 outline-none transition-all text-sm placeholder:text-on-surface-variant/30 resize-none"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 4 && (
                                    <motion.div key="st4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                                        <h2 className="text-2xl font-headline font-bold text-primary mb-2">Consummate Booking</h2>
                                        <p className="text-on-surface-variant text-sm mb-10 font-light">Review your alignment details before final transmission.</p>

                                        <div className="bg-surface-container rounded-2xl p-8 border border-primary/10 mb-8 space-y-8">
                                            <div className="flex items-center gap-5">
                                                <div className="w-16 h-16 rounded-full gold-gradient shadow-lg flex items-center justify-center text-on-primary">
                                                    <span className="material-symbols-outlined text-3xl">auto_awesome</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-headline font-bold text-lg text-primary">{formData.service.toUpperCase().replace('-', ' ')}</h4>
                                                    <p className="text-on-surface-variant text-xs font-light tracking-widest uppercase">{formData.mode} · {formData.type} PRIORITY</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-x-12 gap-y-6 pt-8 border-t border-primary/5">
                                                <div>
                                                    <p className="text-[10px] text-on-surface-variant/50 uppercase tracking-widest mb-1">Subject</p>
                                                    <p className="text-sm font-medium text-on-surface">{formData.name || 'Not Provided'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-on-surface-variant/50 uppercase tracking-widest mb-1">Contact</p>
                                                    <p className="text-sm font-medium text-on-surface">{formData.email || 'Not Provided'}</p>
                                                </div>
                                                {isAstroRelated && (
                                                    <div>
                                                        <p className="text-[10px] text-on-surface-variant/50 uppercase tracking-widest mb-1">Birth Mapping</p>
                                                        <p className="text-sm font-medium text-on-surface">{formData.birthDate} · {formData.birthTime}</p>
                                                    </div>
                                                )}
                                                {isVastuRelated && (
                                                    <div>
                                                        <p className="text-[10px] text-on-surface-variant/50 uppercase tracking-widest mb-1">Location Context</p>
                                                        <p className="text-sm font-medium text-on-surface truncate">{formData.address || 'Not Provided'}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <label className="flex items-center gap-4 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={formData.agreeToTerms}
                                                onChange={() => setFormData({ ...formData, agreeToTerms: !formData.agreeToTerms })}
                                                className="w-5 h-5 rounded border-primary/20 bg-surface-container accent-primary"
                                            />
                                            <span className="text-xs text-on-surface-variant font-light group-hover:text-primary transition-colors">
                                                I confirm all details are accurate & agree to the sacred consultation guidelines.
                                            </span>
                                        </label>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Navigation Buttons */}
                            <div className="mt-auto pt-10 flex justify-between gap-4">
                                {step > 1 && (
                                    <button
                                        onClick={handlePrev}
                                        className="py-4 px-10 rounded-full border border-primary/20 text-on-surface-variant/60 font-label text-xs uppercase tracking-widest hover:bg-surface-container transition-all"
                                    >
                                        Retreat
                                    </button>
                                )}
                                <button
                                    onClick={async () => {
                                        if (!formData.agreeToTerms) return;

                                        setIsSubmitting(true);
                                        setSubmitStatus(null);

                                        try {
                                            const token = localStorage.getItem('token');
                                            const consultationData = {
                                                type: formData.service,
                                                serviceName: formData.service,
                                                mode: formData.mode,
                                                priority: formData.type,
                                                amount: calculatePrice,
                                                clientDetails: {
                                                    name: formData.name,
                                                    email: formData.email,
                                                    phone: formData.phone
                                                },
                                                astrologyDetails: isAstroRelated ? {
                                                    birthDate: formData.birthDate,
                                                    birthTime: formData.birthTime,
                                                    birthCity: formData.birthCity
                                                } : null,
                                                vastuDetails: isVastuRelated ? {
                                                    address: formData.address,
                                                    propertyDetails: formData.propertyDetails,
                                                    propertyType: formData.propertyType
                                                } : null
                                            };

                                            await axios.post(`${API_URL}/consultations`, consultationData, {
                                                headers: token ? { 'x-auth-token': token } : {}
                                            });

                                            setSubmitStatus('success');
                                            setTimeout(() => {
                                                navigate('/');
                                            }, 2000);
                                        } catch (error) {
                                            console.error('Booking error:', error);
                                            setSubmitStatus('error');
                                        } finally {
                                            setIsSubmitting(false);
                                        }
                                    }}
                                    disabled={step === 4 && !formData.agreeToTerms || isSubmitting}
                                    className={`flex-1 py-4 px-10 rounded-full font-bold font-label text-xs uppercase tracking-widest shadow-xl transition-all duration-300 ${step === 4 && !formData.agreeToTerms || isSubmitting ? 'bg-surface-container text-on-surface-variant/20 cursor-not-allowed border border-primary/10' : 'gold-gradient text-on-primary hover:scale-105 active:scale-95'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="w-4 h-4 rounded-full border-2 border-on-primary/20 border-t-on-primary animate-spin" />
                                            Transmitting...
                                        </span>
                                    ) : submitStatus === 'success' ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="material-symbols-outlined">check_circle</span>
                                            Request Transmitted
                                        </span>
                                    ) : submitStatus === 'error' ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="material-symbols-outlined">error</span>
                                            Try Again
                                        </span>
                                    ) : (
                                        'Confirm Transmission'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BookingPage;

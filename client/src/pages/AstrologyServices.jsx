import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AstrologyServices = () => {
    const [pricingType, setPricingType] = useState('regular'); // 'regular' | 'urgent'
    const [openFaq, setOpenFaq] = useState(null);

    const lifeAreas = [
        {
            icon: 'favorite',
            title: 'Love & Marriage',
            desc: 'Couple compatibility, marriage timing, family conflicts, and relationship healing.',
        },
        {
            icon: 'work',
            title: 'Career & Business',
            desc: 'Job switches, business ventures, side income streams, and professional growth timing.',
        },
        {
            icon: 'payments',
            title: 'Money & Investments',
            desc: 'Earnings potential, smart investment timing, savings patterns, and financial blocks.',
        },
        {
            icon: 'home',
            title: 'Property Matters',
            desc: 'Property purchase, sale, disputes, and the right timing for real estate decisions.',
        },
        {
            icon: 'gavel',
            title: 'Court & Legal',
            desc: 'Guidance on ongoing or upcoming legal matters and favorable timing for resolution.',
        },
        {
            icon: 'child_care',
            title: 'Progeny & Child',
            desc: 'Conceiving guidance, child naming as per chart, and health & education of children.',
        },
        {
            icon: 'school',
            title: 'Education',
            desc: 'Subject selection, exam timing, study abroad prospects, and academic performance.',
        },
        {
            icon: 'flight_takeoff',
            title: 'Foreign Settlement',
            desc: 'Prospects for settling abroad, visa timing, and international career opportunities.',
        },
        {
            icon: 'health_and_safety',
            title: 'Health & Inner Peace',
            desc: 'Planetary influences on physical health, mental wellness, and spiritual alignment.',
        },
        {
            icon: 'diamond',
            title: 'Gemstone Recommendation',
            desc: 'Identifying the specific gemstones that amplify your positive planetary influences.',
        },
        {
            icon: 'pin',
            title: 'Astro Numero Alignment',
            desc: 'Combining numerology with your birth chart for deeper insight into your life path number.',
        },
        {
            icon: 'casino',
            title: 'Lucky Numbers & Colours',
            desc: 'Your personal lucky numbers, colours, days, and directions as per your chart.',
        },
    ];

    const modes = [
        {
            icon: 'call',
            title: 'Audio Call',
            desc: 'A focused voice consultation — clear, personal, and distraction-free. Ideal for clients who prefer listening and taking notes.',
            available: 'Worldwide',
            availableIcon: 'language',
            durations: ['30 minutes', '60 minutes'],
        },
        {
            icon: 'videocam',
            title: 'Video Call',
            desc: 'A face-to-face session that allows Smeet to share charts, diagrams, and visual explanations in real time for deeper clarity.',
            available: 'Worldwide',
            availableIcon: 'language',
            durations: ['30 minutes', '60 minutes'],
            featured: true,
        },
        {
            icon: 'location_on',
            title: 'In-Person Meet',
            desc: 'The most immersive experience — a personal consultation in a sacred, undistracted environment for the deepest reading.',
            available: 'Gujarat, India & UAE',
            availableIcon: 'place',
            durations: ['Full session'],
        },
    ];

    const pricing = {
        regular: [
            { mode: 'Audio Call', duration: '30 Min', price: 'AED 150', icon: 'call' },
            { mode: 'Audio Call', duration: '60 Min', price: 'AED 250', icon: 'call' },
            { mode: 'Video Call', duration: '30 Min', price: 'AED 300', icon: 'videocam' },
            { mode: 'Video Call', duration: '60 Min', price: 'AED 550', icon: 'videocam' },
            { mode: 'In-Person', duration: '—', price: 'AED 1,000', icon: 'location_on' },
        ],
        urgent: [
            { mode: 'Audio Call', duration: '30 Min', price: 'AED 250', icon: 'call' },
            { mode: 'Audio Call', duration: '60 Min', price: 'AED 350', icon: 'call' },
            { mode: 'Video Call', duration: '30 Min', price: 'AED 500', icon: 'videocam' },
            { mode: 'Video Call', duration: '60 Min', price: 'AED 700', icon: 'videocam' },
            { mode: 'In-Person', duration: '—', price: 'AED 1,500', icon: 'location_on' },
        ]
    };

    const steps = [
        {
            number: '01',
            icon: 'calendar_month',
            title: 'Book Your Session',
            desc: 'Choose your preferred consultation mode (Audio / Video / In-Person) and whether you need Regular or Urgent scheduling.'
        },
        {
            number: '02',
            icon: 'id_card',
            title: 'Share Your Birth Details',
            desc: 'Provide your accurate Date of Birth, Birth Time, Birth City, and Gender. These are the foundation of your personalized reading.'
        },
        {
            number: '03',
            icon: 'auto_awesome',
            title: 'Chart Preparation',
            desc: 'Smeet prepares your complete Jyotish birth chart, analyzing your planetary positions, dashas, and relevant transits before the session.'
        },
        {
            number: '04',
            icon: 'forum',
            title: 'Your Consultation',
            desc: 'Connect via your chosen mode for a focused, personalized session covering all the life areas relevant to your current questions.'
        },
        {
            number: '05',
            icon: 'task_alt',
            title: 'Remedies & Guidance',
            desc: 'Receive practical, customized remedies and actionable guidance — calibrated to your ability, lifestyle, and circumstances.'
        },
    ];

    const differentiators = [
        {
            icon: 'person',
            title: 'Truly Personalized',
            desc: 'Every consultation is built from YOUR birth chart — not a generic sun sign reading. No two consultations are ever the same.'
        },
        {
            icon: 'construction',
            title: 'Practical Remedies',
            desc: 'Guidance and remedies are customized to your actual ability, age, gender, religion, and lifestyle — never one-size-fits-all.'
        },
        {
            icon: 'lock',
            title: 'Complete Confidentiality',
            desc: 'Your birth details and consultation content are held in strict confidence. We never share your information with any third party.'
        },
        {
            icon: 'diversity_3',
            title: 'For Everyone',
            desc: 'Our services are open to all — regardless of nationality, religion, caste, or background. The stars speak to every soul equally.'
        },
        {
            icon: 'school',
            title: 'Guru-Mentored Expertise',
            desc: 'Smeet has been personally mentored by top Gurus of Jyotish & Vastu Shastra — bringing authentic, lineage-based knowledge to every session.'
        },
        {
            icon: 'translate',
            title: 'Speaks Your Language',
            desc: 'Consultations available in English, Hindi, and Gujarati — so you can communicate and understand with total clarity.'
        },
    ];

    const faqs = [
        {
            q: 'What information do I need to provide for a consultation?',
            a: 'You need to provide your accurate Date of Birth, Time of Birth, Birth City/Place, and Gender. The accuracy of your birth time is especially important as it determines the ascendant (Lagna) and house placements in your chart.'
        },
        {
            q: 'What is the minimum age for a consultation?',
            a: 'Consultations are available for individuals aged 16 years and above. For younger children, a parent or guardian may consult on their behalf as part of the Progeny or Child guidance session.'
        },
        {
            q: 'What is the difference between Regular and Urgent scheduling?',
            a: 'Regular scheduling means your consultation is prepared and delivered within 5 working days, which allows for thorough chart analysis. Urgent scheduling delivers within 1 working day for time-sensitive situations, at a higher fee to reflect the expedited preparation.'
        },
        {
            q: 'Can I consult for someone else — my spouse, child, or parent?',
            a: 'Yes, you can book a consultation on behalf of another person, as long as you have their accurate birth details. Each person\'s chart is separate, and each consultation is per person.'
        },
        {
            q: 'Is the consultation available in Hindi or Gujarati?',
            a: 'Yes. Smeet is fluent in English, Hindi, and Gujarati. You can request your preferred language when booking and the consultation will be conducted entirely in that language.'
        },
        {
            q: 'What kind of remedies are recommended?',
            a: 'Remedies are always practical and customized to your specific situation, ability, age, and lifestyle. They may include gemstone recommendations, mantra suggestions, timing-based actions, or directional adjustments — never anything disruptive or unrealistic.'
        },
        {
            q: 'Is my consultation information kept confidential?',
            a: 'Absolutely. All personal information, birth details, and consultation content are kept strictly confidential. We do not share any client information with third parties under any circumstances.'
        },
    ];

    return (
        <div className="bg-background text-on-surface min-h-screen">
            <Navbar />

            {/* SECTION 1 — BREADCRUMB */}
            <div className="pt-24 px-8 bg-background">
                <div className="max-w-7xl mx-auto">
                    <nav className="flex items-center gap-2 text-xs font-label text-on-surface-variant/50 py-4">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span className="text-primary">Trikaal Astrology Consultation</span>
                    </nav>
                </div>
            </div>

            <main>
                {/* SECTION 2 — PAGE HERO HEADER */}
                <header className="relative text-center max-w-5xl mx-auto pt-12 pb-20 px-8 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/6 rounded-full blur-[130px] pointer-events-none" />
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10"
                    >
                        <span className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full bg-surface-container border border-primary/20 text-primary text-xs font-label tracking-[0.2em] uppercase">
                            <span className="material-symbols-outlined text-sm">auto_awesome</span>
                            Vedic Astrology
                        </span>
                        
                        <p className="text-primary/60 text-xl md:text-2xl mb-6 tracking-[0.1em]" style={{ fontFamily: "'Noto Serif Devanagari', serif" }}>
                            ॐ असतो मा सद्गमय
                        </p>

                        <h1 className="text-5xl md:text-7xl font-headline font-bold text-primary mb-6 leading-tight tracking-tight">
                            Trikaal Astrology<br />
                            <span className="italic font-normal">Consultation</span>
                        </h1>

                        <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto font-body font-light leading-relaxed mb-12">
                            The science of decoding your star alignments, planetary positions & zodiac — 
                            and guiding you towards your true life path.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4">
                            {[
                                { icon: 'translate', text: 'English · Hindi · Gujarati' },
                                { icon: 'language', text: 'Available Worldwide' },
                                { icon: 'verified', text: 'Guru-Mentored Consultant' },
                            ].map((chip, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                    className="flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-surface-container text-on-surface-variant text-sm font-label"
                                >
                                    <span className="material-symbols-outlined text-primary text-base">{chip.icon}</span>
                                    {chip.text}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </header>

                {/* SECTION 3 — WHAT IS TRIKAAL ASTROLOGY */}
                <section className="bg-surface py-24 px-8">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-primary font-label text-xs tracking-[0.3em] uppercase block mb-4">
                                The Science
                            </span>
                            <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold mb-6 leading-tight">
                                What is Trikaal Astrology?
                            </h2>
                            <p className="text-on-surface-variant font-body font-light leading-relaxed text-lg mb-6">
                                <span className="text-primary font-headline italic">Trikaal</span> — meaning past, present, and future — 
                                is the science of decoding the precise alignment of stars, planets, and zodiac signs 
                                at the moment of your birth, and using that map to illuminate every area of your life.
                            </p>
                            <p className="text-on-surface-variant font-body font-light leading-relaxed mb-8">
                                Unlike generic horoscopes, a Trikaal consultation is deeply personalized — 
                                built entirely from your accurate birth date, time, and place. 
                                The result is not prediction for prediction's sake, but practical, actionable guidance 
                                to navigate your career, relationships, finances, health, and purpose with clarity.
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {[
                                    'Parashari Jyotish system',
                                    'Personalized to your birth chart',
                                    'Practical remedies, not just predictions',
                                    'Modern application of ancient science',
                                ].map((chip, i) => (
                                    <span key={i} className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-surface-container text-on-surface-variant text-xs font-label">
                                        <span className="material-symbols-outlined text-primary text-xs">check_circle</span>
                                        {chip}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-3 gap-4"
                        >
                            {[
                                { icon: 'history', label: 'Bhoot', sublabel: 'The Past', desc: 'Understanding karmic patterns and inherited tendencies.' },
                                { icon: 'radio_button_checked', label: 'Vartamaan', sublabel: 'The Present', desc: 'Clarity on current planetary transits affecting your life now.' },
                                { icon: 'upcoming', label: 'Bhavishya', sublabel: 'The Future', desc: 'Identifying the optimal windows for major decisions and actions.' },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    className="flex flex-col items-center text-center p-6 bg-surface-container border border-primary/10 rounded-xl hover:border-primary/30 transition-all"
                                >
                                    <div className="w-14 h-14 rounded-full bg-primary/8 border border-primary/20 flex items-center justify-center mb-4">
                                        <span className="material-symbols-outlined text-primary text-2xl">{item.icon}</span>
                                    </div>
                                    <span className="font-headline text-primary font-bold text-lg block mb-0.5">{item.label}</span>
                                    <span className="text-primary/50 font-label text-xs tracking-widest uppercase mb-3">{item.sublabel}</span>
                                    <p className="text-on-surface-variant text-xs font-light leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                            <div className="col-span-3 bg-primary/8 border border-primary/20 rounded-xl p-5 text-center">
                                <p className="text-primary font-headline italic text-lg">
                                    "A Modern Approach to Vedic Science."
                                </p>
                                <p className="text-on-surface-variant text-xs font-label mt-1">— Trikaal</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 4 — LIFE AREAS COVERED */}
                <section className="bg-background py-24 px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-primary font-label text-xs tracking-[0.3em] uppercase block mb-3">
                                One Consultation Covers All
                            </span>
                            <h2 className="font-headline text-4xl text-primary font-bold">Life Areas We Illuminate</h2>
                            <p className="text-on-surface-variant mt-4 font-body font-light max-w-xl mx-auto">
                                A single Trikaal Astrology consultation addresses every dimension of your life journey.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {lifeAreas.map((area, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-surface-container border border-primary/8 rounded-xl p-6 hover:border-primary/30 hover:bg-surface-container-high transition-all duration-300 group"
                                >
                                    <div className="w-11 h-11 rounded-full bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                                        <span className="material-symbols-outlined text-primary text-xl">{area.icon}</span>
                                    </div>
                                    <h3 className="font-headline text-primary font-bold text-sm mb-2">{area.title}</h3>
                                    <p className="text-on-surface-variant text-xs font-light leading-relaxed">{area.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center text-on-surface-variant/50 text-sm mt-10 font-light"
                        >
                            All areas are covered in a single consultation session — no need to book separately.
                        </motion.p>
                    </div>
                </section>

                {/* SECTION 5 — CONSULTATION MODES */}
                <section className="bg-surface py-24 px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-primary font-label text-xs tracking-[0.3em] uppercase block mb-3">
                                How You Connect
                            </span>
                            <h2 className="font-headline text-4xl text-primary font-bold">Consultation Modes</h2>
                            <p className="text-on-surface-variant mt-4 font-body font-light max-w-xl mx-auto">
                                Choose the format that suits you best. The depth of insight is the same across all modes.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {modes.map((mode, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`relative rounded-xl overflow-hidden border transition-all duration-500 flex flex-col ${
                                        mode.featured
                                            ? 'border-primary/40 bg-surface-container-high shadow-[0_0_40px_rgba(201,168,76,0.1)]'
                                            : 'border-primary/10 bg-surface-container hover:border-primary/30'
                                    }`}
                                >
                                    {mode.featured && <div className="absolute top-0 left-0 right-0 h-0.5 gold-gradient" />}
                                    {mode.featured && (
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 rounded-full gold-gradient text-on-primary font-label text-xs">
                                                Most Popular
                                            </span>
                                        </div>
                                    )}

                                    <div className="p-8 flex flex-col flex-1">
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${
                                            mode.featured ? 'bg-primary/15 border border-primary/30' : 'bg-primary/8 border border-primary/15'
                                        }`}>
                                            <span className="material-symbols-outlined text-primary text-3xl">{mode.icon}</span>
                                        </div>
                                        <h3 className="font-headline text-2xl text-primary font-bold mb-3">{mode.title}</h3>
                                        <p className="text-on-surface-variant font-body font-light text-sm leading-relaxed mb-6 flex-1">
                                            {mode.desc}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {mode.durations.map((d, j) => (
                                                <span key={j} className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-primary/15 text-on-surface-variant text-xs font-label">
                                                    <span className="material-symbols-outlined text-primary text-xs">schedule</span>
                                                    {d}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-2 text-on-surface-variant/60 text-xs font-label border-t border-primary/8 pt-4">
                                            <span className="material-symbols-outlined text-primary text-sm">{mode.availableIcon}</span>
                                            {mode.available}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 6 — PRICING TABLE */}
                <section className="bg-background py-24 px-8">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <span className="text-primary font-label text-xs tracking-[0.3em] uppercase block mb-3">
                                Transparent Pricing
                            </span>
                            <h2 className="font-headline text-4xl text-primary font-bold">Consultation Fees</h2>
                            <p className="text-on-surface-variant mt-3 font-body font-light text-sm">
                                All fees are per person · AED (UAE Dirham)
                            </p>
                        </div>

                        <div className="flex bg-surface-container rounded-full p-1 border border-primary/10 mb-10 max-w-sm mx-auto">
                            {[
                                { key: 'regular', label: 'Regular', icon: 'schedule', sub: 'After 5 working days' },
                                { key: 'urgent', label: 'Urgent', icon: 'bolt', sub: 'Within 1 working day' },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setPricingType(tab.key)}
                                    className={`flex-1 flex flex-col items-center py-3 px-4 rounded-full font-label text-sm tracking-wide transition-all duration-300 ${
                                        pricingType === tab.key
                                            ? 'gold-gradient text-on-primary shadow-lg'
                                            : 'text-on-surface-variant hover:text-primary'
                                    }`}
                                >
                                    <span className="flex items-center gap-1.5 font-bold">
                                        <span className="material-symbols-outlined text-sm">{tab.icon}</span>
                                        {tab.label}
                                    </span>
                                    <span className="text-xs opacity-70 mt-0.5">{tab.sub}</span>
                                </button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={pricingType}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-surface-container border border-primary/10 rounded-xl overflow-hidden"
                            >
                                <div className="grid grid-cols-3 bg-surface-container-high border-b border-primary/10 px-6 py-3">
                                    <span className="font-label text-xs text-on-surface-variant/50 tracking-widest uppercase">Mode</span>
                                    <span className="font-label text-xs text-on-surface-variant/50 tracking-widest uppercase text-center">Duration</span>
                                    <span className="font-label text-xs text-on-surface-variant/50 tracking-widest uppercase text-right">Fee</span>
                                </div>

                                {pricing[pricingType].map((row, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.07 }}
                                        className={`grid grid-cols-3 px-6 py-4 border-b border-primary/5 last:border-0 items-center hover:bg-surface-container-high transition-colors ${
                                            row.mode === 'In-Person' ? 'bg-primary/3' : ''
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/8 flex items-center justify-center flex-shrink-0">
                                                <span className="material-symbols-outlined text-primary text-sm">{row.icon}</span>
                                            </div>
                                            <span className="text-on-surface font-label text-sm">{row.mode}</span>
                                        </div>
                                        <span className="text-on-surface-variant text-sm text-center font-light">{row.duration}</span>
                                        <span className="font-headline text-primary font-bold text-lg text-right">{row.price}</span>
                                    </motion.div>
                                ))}

                                <div className="px-6 py-4 bg-surface-container-high border-t border-primary/10 flex items-start gap-2">
                                    <span className="material-symbols-outlined text-primary/50 text-sm mt-0.5">info</span>
                                    <p className="text-on-surface-variant/50 text-xs font-light">
                                        In-person consultations available in Gujarat, India & UAE only.
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <p className="text-center text-on-surface-variant/40 text-xs mt-6 font-light">
                            Fees are per person and for consultation only. 
                            For multiple persons, add units accordingly.
                        </p>

                        <div className="text-center mt-8">
                            <Link to="/booking" className="gold-gradient text-on-primary px-10 py-4 rounded-full font-bold text-base hover:scale-105 inline-flex items-center gap-2 shadow-xl">
                                <span className="material-symbols-outlined">calendar_month</span>
                                Book a Session
                            </Link>
                        </div>
                    </div>
                </section>

                {/* SECTION 7 — REQUIREMENTS INFO CARD */}
                <section className="bg-surface py-16 px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="glass-card rounded-xl p-10 border border-primary/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div>
                                    <h4 className="font-headline text-xl text-primary mb-6 flex items-center gap-3">
                                        <span className="material-symbols-outlined">id_card</span>
                                        What You'll Need
                                    </h4>
                                    <ul className="space-y-4">
                                        {[
                                            { icon: 'cake', text: 'Accurate Date of Birth' },
                                            { icon: 'schedule', text: 'Accurate Time of Birth' },
                                            { icon: 'location_city', text: 'Birth City / Place' },
                                            { icon: 'person', text: 'Gender' },
                                            { icon: 'verified_user', text: 'Must be 16 years or older' },
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-on-surface-variant">
                                                <div className="w-9 h-9 rounded-full bg-primary/8 border border-primary/15 flex items-center justify-center flex-shrink-0">
                                                    <span className="material-symbols-outlined text-primary text-base">{item.icon}</span>
                                                </div>
                                                <span className="text-sm font-light">{item.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex flex-col gap-5">
                                    <div className="bg-primary/8 border border-primary/20 rounded-xl p-5 flex items-start gap-4">
                                        <span className="material-symbols-outlined text-primary text-2xl flex-shrink-0">info</span>
                                        <div>
                                            <p className="font-headline text-primary font-bold text-base mb-1">Age Requirement</p>
                                            <p className="text-on-surface-variant text-sm font-light">
                                                Consultations are available for clients aged 16 years and above only.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-primary/8 border border-primary/20 rounded-xl p-5 flex items-start gap-4">
                                        <span className="material-symbols-outlined text-primary text-2xl flex-shrink-0">warning</span>
                                        <div>
                                            <p className="font-headline text-primary font-bold text-base mb-1">Accuracy is Essential</p>
                                            <p className="text-on-surface-variant text-sm font-light">
                                                The quality of your reading directly depends on the accuracy of your birth details — 
                                                especially the time of birth. Even a few minutes can shift the analysis.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-primary/8 border border-primary/20 rounded-xl p-5 flex items-start gap-4">
                                        <span className="material-symbols-outlined text-primary text-2xl flex-shrink-0">lock</span>
                                        <div>
                                            <p className="font-headline text-primary font-bold text-base mb-1">100% Confidential</p>
                                            <p className="text-on-surface-variant text-sm font-light">
                                                All information shared during your consultation is strictly confidential 
                                                and will never be shared with any third party.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 8 — HOW IT WORKS */}
                <section className="bg-background py-24 px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-primary font-label text-xs tracking-[0.3em] uppercase block mb-3">
                                Your Journey
                            </span>
                            <h2 className="font-headline text-4xl text-primary font-bold">How It Works</h2>
                        </div>

                        <div className="relative">
                            <div className="hidden lg:block absolute top-10 left-[8%] right-[8%] h-px border-t border-dashed border-primary/15" />
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
                                {steps.map((step, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.12 }}
                                        className="flex flex-col items-center text-center"
                                    >
                                        <div className="relative mb-6">
                                            <div className="w-20 h-20 rounded-full border border-primary/20 bg-surface-container flex items-center justify-center">
                                                <span className="material-symbols-outlined text-primary text-3xl">{step.icon}</span>
                                            </div>
                                            <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full gold-gradient flex items-center justify-center font-label text-xs font-bold text-on-primary">
                                                {step.number}
                                            </span>
                                        </div>
                                        <h3 className="font-headline text-base text-primary font-bold mb-3">{step.title}</h3>
                                        <p className="text-on-surface-variant text-xs font-light leading-relaxed">{step.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 9 — WHY TRIKAAL */}
                <section className="bg-surface py-24 px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-primary font-label text-xs tracking-[0.3em] uppercase block mb-3">
                                The Difference
                            </span>
                            <h2 className="font-headline text-4xl text-primary font-bold">Why Choose Trikaal?</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {differentiators.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="flex gap-5 p-7 bg-surface-container border border-primary/8 rounded-xl hover:border-primary/25 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-primary/8 border border-primary/15 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-primary text-xl">{item.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-headline text-primary font-bold mb-2">{item.title}</h3>
                                        <p className="text-on-surface-variant text-sm font-light leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 10 — LANGUAGES SPOKEN */}
                <section className="bg-background py-16 px-8 border-y border-primary/5">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="text-primary font-label text-xs tracking-[0.3em] uppercase block mb-8">
                            Consultation Languages
                        </span>
                        <div className="flex flex-wrap items-center justify-center gap-5">
                            {[
                                { flag: '🇬🇧', lang: 'English', note: 'Primary' },
                                { flag: '🇮🇳', lang: 'Hindi', note: 'हिन्दी' },
                                { flag: '🇮🇳', lang: 'Gujarati', note: 'ગુજરાતી' },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4 px-7 py-4 bg-surface-container border border-primary/15 rounded-full hover:border-primary/35 transition-all"
                                >
                                    <span className="text-3xl">{item.flag}</span>
                                    <div className="text-left">
                                        <span className="font-headline text-primary font-bold block text-base">{item.lang}</span>
                                        <span className="text-on-surface-variant font-label text-xs">{item.note}</span>
                                    </div>
                                    <span className="material-symbols-outlined text-primary text-sm ml-2" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 11 — FAQ ACCORDION */}
                <section className="bg-surface py-24 px-8">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-primary font-label text-xs tracking-[0.3em] uppercase block mb-3">
                                Common Questions
                            </span>
                            <h2 className="font-headline text-4xl text-primary font-bold">FAQ</h2>
                        </div>

                        <div className="space-y-3">
                            {faqs.map((faq, i) => (
                                <div
                                    key={i}
                                    className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                                        openFaq === i
                                            ? 'border-primary/30 bg-surface-container'
                                            : 'border-primary/10 bg-surface-container hover:border-primary/20'
                                    }`}
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full flex items-center justify-between p-6 text-left"
                                    >
                                        <span className="font-headline text-on-surface font-medium text-base pr-4">{faq.q}</span>
                                        <span className={`material-symbols-outlined text-primary flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                                            expand_more
                                        </span>
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 pb-6">
                                                    <p className="text-on-surface-variant font-body font-light text-sm leading-relaxed border-t border-primary/10 pt-4">
                                                        {faq.a}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 12 — FINAL CTA BANNER */}
                <section className="bg-background py-24 px-8 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px]" />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto text-center relative z-10"
                    >
                        <p className="text-primary/40 text-2xl mb-6 tracking-[0.1em]" style={{ fontFamily: "'Noto Serif Devanagari', serif" }}>
                            ॐ असतो मा सद्गमय
                        </p>
                        <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold mb-6 leading-tight">
                            Your Stars Are<br />Ready to Speak
                        </h2>
                        <p className="text-on-surface-variant font-body font-light text-lg mb-10 leading-relaxed">
                            Book your personalized Trikaal Astrology consultation today. 
                            Clarity, guidance, and practical remedies — delivered by Smeet.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                            <Link to="/booking" className="gold-gradient text-on-primary px-10 py-5 rounded-full font-bold text-lg hover:scale-105 inline-flex items-center gap-3 shadow-xl">
                                <span className="material-symbols-outlined">calendar_month</span>
                                Book a Consultation
                            </Link>
                            <Link to="/contact" className="px-10 py-5 rounded-full border border-primary/20 text-primary font-bold text-lg hover:bg-primary/10 transition-all inline-flex items-center gap-3">
                                <span className="material-symbols-outlined">chat</span>
                                Ask a Question
                            </Link>
                        </div>
                    </motion.div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AstrologyServices;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const VastuServices = () => {
    const [activeService, setActiveService] = useState('vastu'); // 'vastu' | 'trikaal-vastu'
    const [openFaq, setOpenFaq] = useState(null);

    const deliverables = {
        vastu: [
            { icon: 'map', title: 'Floor Plan Energy Mapping', desc: 'Complete analysis of all zones, directions, and energy corridors in your property.' },
            { icon: 'task_alt', title: 'Zone-by-Zone Assessment', desc: 'Each room and area evaluated against Vastu principles for the 8 directions.' },
            { icon: 'construction', title: 'Practical Remedy Plan', desc: 'Actionable corrections — mostly placement-based, rarely requiring structural changes.' },
            { icon: 'picture_as_pdf', title: 'Written Remedial Report', desc: 'Detailed PDF report you can reference anytime and implement at your own pace.' },
            { icon: 'videocam', title: 'Consultation Session', desc: 'Live discussion of findings, remedies, and your specific questions.' },
            { icon: 'support_agent', title: 'Follow-up Support', desc: 'Post-consultation clarity support for any questions during implementation.' },
        ],
        'trikaal-vastu': [
            { icon: 'map', title: 'Floor Plan Energy Mapping', desc: 'Complete analysis of all zones, directions, and energy corridors in your property.' },
            { icon: 'auto_awesome', title: 'Birth Chart Analysis', desc: 'Full Jyotish chart analysis for each resident or business owner.' },
            { icon: 'hub', title: 'Astro-Vastu Overlay', desc: 'Synchronization of your personal planetary energies with your property\'s spatial zones.' },
            { icon: 'task_alt', title: 'Personalized Remedy Plan', desc: 'Remedies tailored to your specific chart — not generic universal corrections.' },
            { icon: 'picture_as_pdf', title: 'Detailed Written Report', desc: 'Comprehensive PDF covering both the Jyotish and Vastu findings with all remedies.' },
            { icon: 'videocam', title: 'In-Depth Consultation', desc: 'Extended session covering both astrology and Vastu dimensions of your space.' },
        ]
    };

    const processSteps = {
        vastu: [
            { number: '01', icon: 'upload_file', title: 'Share Your Floor Plan', desc: 'Send us an accurate floor plan of your property along with the property address and orientation details.' },
            { number: '02', icon: 'search', title: 'Expert Analysis', desc: 'Our Vastu expert performs a comprehensive analysis of all spatial zones, directions, and energy flow.' },
            { number: '03', icon: 'videocam', title: 'Consultation Session', desc: 'A live session (video call or in-person) where findings, remedies, and your questions are discussed in detail.' },
            { number: '04', icon: 'picture_as_pdf', title: 'Receive Your Report', desc: 'A written remedial report is delivered to you with all corrections documented for easy implementation.' },
        ],
        'trikaal-vastu': [
            { number: '01', icon: 'upload_file', title: 'Share Floor Plan & Birth Details', desc: 'Provide the accurate floor plan and complete birth details (date, time, city) of all residents or business owners.' },
            { number: '02', icon: 'auto_awesome', title: 'Birth Chart Analysis', desc: 'Each person\'s Jyotish chart is analyzed to understand their planetary energies and directional strengths.' },
            { number: '03', icon: 'hub', title: 'Trikaal Overlay', desc: 'The individual charts are mapped onto the property\'s spatial zones to find the optimal personalized alignment.' },
            { number: '04', icon: 'videocam', title: 'In-Depth Consultation', desc: 'A thorough session covering both the astrology insights and Vastu findings, with all remedies explained.' },
            { number: '05', icon: 'picture_as_pdf', title: 'Comprehensive Report', desc: 'A detailed written report covering both Jyotish and Vastu dimensions, with all personalized remedies.' },
        ]
    };

    const useCases = [
        { icon: 'home', title: 'New Home Buyers', desc: 'Before moving in — align your new space from day one for maximum positive energy.' },
        { icon: 'business', title: 'Business Owners', desc: 'Optimize your office or commercial space for productivity, growth, and financial flow.' },
        { icon: 'family_restroom', title: 'Families Facing Struggles', desc: 'Recurring health issues, relationship conflicts, or financial setbacks often have spatial roots.' },
        { icon: 'construction', title: 'Under Construction', desc: 'The best time for Vastu is during construction — corrections before walls go up are easiest.' },
        { icon: 'transfer_within_a_station', title: 'Relocating', desc: 'Evaluating a new property before purchasing or renting — avoid spaces with deep imbalances.' },
        { icon: 'trending_up', title: 'Seeking Growth', desc: 'When everything is going well but you feel there\'s a ceiling — space alignment can remove invisible blocks.' },
    ];

    const faqs = {
        vastu: [
            {
                q: 'Do I need to do major construction for Vastu corrections?',
                a: 'In most cases, no. The majority of Vastu corrections involve placement of objects, colors, and direction-based arrangements. Major structural changes are rarely required.'
            },
            {
                q: 'What format should the floor plan be in?',
                a: 'Any clear digital format is acceptable — PDF, JPG, PNG, or even a clear photo of an architectural drawing. It must be to scale.'
            },
            {
                q: 'How long does the consultation take?',
                a: 'Analysis Typically takes 5–7 working days after receiving all documents. The session is approximately 60–90 minutes.'
            },
            {
                q: 'Is the online consultation as effective as on-site?',
                a: 'Yes. With accurate floor plans, our online consultation delivers the same depth of analysis.'
            },
            {
                q: 'Can Vastu help with rented properties?',
                a: 'Absolutely. Our remedies focus on placement and arrangement rather than structural changes, making them ideal for rentals.'
            },
        ],
        'trikaal-vastu': [
            {
                q: 'Why does Trikaal Vastu require birth details?',
                a: 'Trikaal Vastu personalizes your space to your unique astrological chart, synchronizing your environment with your personal planetary energies.'
            },
            {
                q: 'What if I don\'t know my exact birth time?',
                a: 'An accurate birth time is important. If it is not available, we can sometimes perform birth time rectification before proceeding.'
            },
            {
                q: 'Do I need details of all family members?',
                a: 'Yes, for residential property, we require details of all primary residents to ensure the alignment benefits everyone.'
            },
            {
                q: 'What is the AED 150 per person charge?',
                a: 'This covers the individual Jyotish chart analysis required for each person before we can perform the Trikaal overlay.'
            },
            {
                q: 'How is Trikaal Vastu different from regular Vastu?',
                a: 'Standard Vastu uses universal laws; Trikaal Vastu integrates your personal astrology for deeper, personalized results.'
            },
        ]
    };

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
                        <span className="text-primary">Vastu Consultation</span>
                    </nav>
                </div>
            </div>

            <main>
                {/* SECTION 2 — PAGE HERO HEADER */}
                <header className="relative text-center max-w-5xl mx-auto mb-20 px-6">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/6 rounded-full blur-[120px] pointer-events-none" />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-10"
                    >
                        <span className="inline-block px-4 py-1 mb-6 rounded-full bg-secondary-container/30 text-primary border border-primary/20 text-xs tracking-[0.2em] uppercase">
                            Sacred Architecture
                        </span>
                        <h1 className="text-5xl md:text-7xl font-headline font-bold text-primary mb-6 tracking-tight">
                            Vastu Consultation
                        </h1>
                        <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto font-body font-light leading-relaxed">
                            The ancient science of aligning universal energy flow with your space of 
                            living or working — for harmony, prosperity, and lasting peace.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
                            {[
                                { icon: 'location_on', text: 'On-Site in Gujarat & UAE' },
                                { icon: 'language', text: 'Online · Worldwide' },
                                { icon: 'home_work', text: 'Residential & Commercial' },
                            ].map((chip, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-surface-container text-on-surface-variant text-sm font-label"
                                >
                                    <span className="material-symbols-outlined text-primary text-base">{chip.icon}</span>
                                    {chip.text}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </header>

                {/* SECTION 3 — SERVICE TYPE TABS */}
                <section className="bg-surface py-12 px-8 sticky top-16 z-30 border-b border-primary/10">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex bg-surface-container rounded-full p-1 border border-primary/10">
                            {[
                                { key: 'vastu', label: 'Vastu Consultation', icon: 'home_work' },
                                { key: 'trikaal-vastu', label: 'Trikaal Vastu Consultation', icon: 'hub' },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveService(tab.key)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full font-label text-sm tracking-wide transition-all duration-300 ${
                                        activeService === tab.key
                                            ? 'gold-gradient text-on-primary shadow-lg'
                                            : 'text-on-surface-variant hover:text-primary'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-base">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 4 — WHAT IS THIS SERVICE */}
                <section className="bg-background py-24 px-8 overflow-hidden">
                    <div className="max-w-6xl mx-auto">
                        <AnimatePresence mode="wait">
                            {activeService === 'vastu' ? (
                                <motion.div
                                    key="vastu-desc"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                                >
                                    <div>
                                        <span className="text-primary font-label text-xs tracking-[0.3em] uppercase block mb-4">Vastu Shastra</span>
                                        <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold mb-6 leading-tight">What is Vastu Shastra?</h2>
                                        <p className="text-on-surface-variant font-body font-light leading-relaxed text-lg mb-6">
                                            Vastu Shastra is the ancient Vedic science of aligning the five natural elements within your environment. A harmonized space creates a foundation for health, wealth, and happiness.
                                        </p>
                                        <p className="text-on-surface-variant font-body font-light leading-relaxed">
                                            We identify imbalances and provide practical corrections without major structural changes in most cases.
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { icon: 'landscape', element: 'Earth', color: 'bg-amber-950/20', desc: 'Stability' },
                                            { icon: 'water_drop', element: 'Water', color: 'bg-blue-950/20', desc: 'Abundance' },
                                            { icon: 'local_fire_department', element: 'Fire', color: 'bg-red-950/20', desc: 'Energy' },
                                            { icon: 'air', element: 'Air', color: 'bg-slate-800/20', desc: 'Flow' },
                                        ].map((el, i) => (
                                            <div key={i} className={`${el.color} border border-primary/10 rounded-xl p-6 flex flex-col items-center text-center`}>
                                                <span className="material-symbols-outlined text-primary text-3xl mb-3">{el.icon}</span>
                                                <span className="font-headline text-primary font-bold text-sm mb-1">{el.element}</span>
                                                <span className="text-on-surface-variant text-xs font-light">{el.desc}</span>
                                            </div>
                                        ))}
                                        <div className="col-span-2 bg-purple-950/20 border border-primary/10 rounded-xl p-6 flex items-center justify-center gap-4">
                                            <span className="material-symbols-outlined text-primary text-3xl">blur_circular</span>
                                            <div>
                                                <span className="font-headline text-primary font-bold block">Space (Akasha)</span>
                                                <span className="text-on-surface-variant text-xs font-light">Expansion</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="trikaal-vastu-desc"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                                >
                                    <div>
                                        <span className="text-primary font-label text-xs tracking-[0.3em] uppercase block mb-4">Trikaal Vastu</span>
                                        <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold mb-6 leading-tight">What is Trikaal Vastu?</h2>
                                        <p className="text-on-surface-variant font-body font-light leading-relaxed text-lg mb-6">
                                            Trikaal Vastu combines Jyotish Shastra (Vedic Astrology) with Vastu Shastra to personalize your space's energy based on the residents' unique star alignment.
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            {['Birth chart integrated', 'Jyotish + Vastu', 'Most personalized', 'Deeper results'].map((chip, i) => (
                                                <span key={i} className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-surface-container text-on-surface-variant text-xs font-label">
                                                    <span className="material-symbols-outlined text-primary text-xs">check_circle</span>
                                                    {chip}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-surface-container border border-primary/10 rounded-xl overflow-hidden">
                                        <div className="grid grid-cols-3 border-b border-primary/10 bg-surface-container-high/50">
                                            <div className="p-4"></div>
                                            <div className="p-4 text-center border-l border-primary/10"><span className="text-primary font-label text-xs font-bold">Vastu</span></div>
                                            <div className="p-4 text-center border-l border-primary/10 bg-primary/5"><span className="text-primary font-label text-xs font-bold">Trikaal</span></div>
                                        </div>
                                        {[
                                            { label: 'Energy Mapping', v: true, t: true },
                                            { label: 'Birth Chart Sync', v: false, t: true },
                                            { label: 'Personalized Overlay', v: false, t: true },
                                        ].map((row, i) => (
                                            <div key={i} className="grid grid-cols-3 border-b border-primary/5 last:border-0">
                                                <div className="p-4 text-on-surface-variant text-xs">{row.label}</div>
                                                <div className="p-4 text-center border-l border-primary/5">{row.v ? '✓' : '—'}</div>
                                                <div className="p-4 text-center border-l border-primary/5 bg-primary/3">✓</div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>

                {/* SECTION 5 — PRICING CARDS */}
                <section className="bg-surface py-24 px-8">
                    <div className="max-w-7xl mx-auto text-center mb-16">
                        <span className="text-primary font-label text-xs tracking-[0.3em] uppercase block mb-3">Transparent Pricing</span>
                        <h2 className="font-headline text-4xl text-primary font-bold">Choose Your Mode</h2>
                        <p className="text-on-surface-variant mt-3 font-body font-light">All fees are per property · AED (UAE Dirham)</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* On-Site */}
                        <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -30 }} viewport={{ once: true }} className="bg-surface-container-high rounded-xl overflow-hidden border border-primary/10 flex flex-col">
                            <div className="bg-surface-container p-8 border-b border-primary/10 flex justify-between">
                                <div>
                                    <span className="material-symbols-outlined text-primary text-4xl mb-4 block">location_on</span>
                                    <h3 className="font-headline text-2xl font-bold text-primary">On-Site Visit</h3>
                                </div>
                                <span className="px-3 py-1 h-fit rounded-full bg-amber-600/10 text-amber-400 font-label text-xs">In-Person</span>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between p-4 rounded-lg bg-surface-container border border-primary/8">
                                        <span className="text-on-surface font-label text-sm">Residential</span>
                                        <span className="font-headline text-xl text-primary font-bold">AED 7,000</span>
                                    </div>
                                    <div className="flex justify-between p-4 rounded-lg bg-surface-container border border-primary/8">
                                        <span className="text-on-surface font-label text-sm">Commercial</span>
                                        <span className="font-headline text-xl text-primary font-bold">AED 10,000</span>
                                    </div>
                                </div>
                                <p className="text-on-surface-variant/60 font-label text-[10px] uppercase mb-4 tracking-widest">Required from Client</p>
                                <ul className="space-y-2 mb-8 flex-1">
                                    <li className="flex items-start gap-2 text-sm font-light text-on-surface-variant"><span className="material-symbols-outlined text-primary text-sm mt-0.5">check_small</span>Floor plan & Property orientation</li>
                                    <li className="flex items-start gap-2 text-sm font-light text-on-surface-variant"><span className="material-symbols-outlined text-primary text-sm mt-0.5">check_small</span>Expert site access</li>
                                </ul>
                                <Link 
                                    to="/booking"
                                    className="w-full py-4 rounded-full border border-primary/30 text-primary font-bold text-center block"
                                >
                                    Inquire for On-Site
                                </Link>
                            </div>
                        </motion.div>

                        {/* Online */}
                        <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 30 }} viewport={{ once: true }} className="bg-surface-container-high rounded-xl overflow-hidden border border-primary/10 flex flex-col">
                            <div className="bg-surface-container p-8 border-b border-primary/10 flex justify-between">
                                <div>
                                    <span className="material-symbols-outlined text-primary text-4xl mb-4 block">language</span>
                                    <h3 className="font-headline text-2xl font-bold text-primary">Online Digital Audit</h3>
                                </div>
                                <span className="px-3 py-1 h-fit rounded-full bg-green-700/10 text-green-400 font-label text-xs">Worldwide</span>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between p-4 rounded-lg bg-surface-container border border-primary/8">
                                        <span className="text-on-surface font-label text-sm">Residential</span>
                                        <span className="font-headline text-xl text-primary font-bold">AED 5,000</span>
                                    </div>
                                    <div className="flex justify-between p-4 rounded-lg bg-surface-container border border-primary/8">
                                        <span className="text-on-surface font-label text-sm">Commercial</span>
                                        <span className="font-headline text-xl text-primary font-bold">AED 7,000</span>
                                    </div>
                                </div>
                                <p className="text-on-surface-variant/60 font-label text-[10px] uppercase mb-4 tracking-widest">Required from Client</p>
                                <ul className="space-y-2 mb-8 flex-1">
                                    <li className="flex items-start gap-2 text-sm font-light text-on-surface-variant"><span className="material-symbols-outlined text-primary text-sm mt-0.5">check_small</span>Accurate digital floor plan</li>
                                    <li className="flex items-start gap-2 text-sm font-light text-on-surface-variant"><span className="material-symbols-outlined text-primary text-sm mt-0.5">check_small</span>Video call session</li>
                                </ul>
                                <Link 
                                    to="/booking"
                                    className="w-full py-4 rounded-full gold-gradient text-on-primary font-bold text-center block shadow-lg"
                                >
                                    Book Online Session
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                    <p className="text-center text-on-surface-variant/40 text-sm mt-10 italic">
                        {activeService === 'trikaal-vastu' && 'AED 150 charged per person\'s birth chart for analysis.'}
                    </p>
                </section>

                {/* SECTION 6 — WHAT'S INCLUDED */}
                <section className="bg-background py-24 px-8">
                    <div className="max-w-7xl mx-auto text-center mb-16">
                        <span className="text-primary font-label text-xs tracking-[0.3em] uppercase block mb-3">Deliverables</span>
                        <h2 className="font-headline text-4xl text-primary font-bold">What You Receive</h2>
                    </div>
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="wait">
                            {deliverables[activeService].map((item, i) => (
                                <motion.div
                                    key={activeService + i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex gap-5 p-6 bg-surface-container border border-primary/8 rounded-xl hover:border-primary/25 transition-all"
                                >
                                    <div className="w-12 h-12 rounded-full bg-primary/8 border border-primary/15 flex items-center justify-center flex-shrink-0">
                                        <span className="material-symbols-outlined text-primary text-xl">{item.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-headline text-primary font-bold text-base mb-2">{item.title}</h4>
                                        <p className="text-on-surface-variant text-sm font-light leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </section>

                {/* SECTION 7 — THE PROCESS */}
                <section className="bg-surface py-24 px-8 overflow-hidden">
                    <div className="max-w-7xl mx-auto text-center mb-20 space-y-4">
                        <span className="text-primary font-label text-xs tracking-[0.3em] uppercase block">The Journey</span>
                        <h2 className="font-headline text-4xl text-primary font-bold">How It Works</h2>
                    </div>
                    <div className="max-w-7xl mx-auto relative">
                        <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px border-t border-dashed border-primary/15" />
                        <div className={`grid grid-cols-1 md:grid-cols-2 ${activeService === 'vastu' ? 'lg:grid-cols-4' : 'lg:grid-cols-5'} gap-10`}>
                            {processSteps[activeService].map((step, i) => (
                                <motion.div key={i} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center text-center relative z-10">
                                    <div className="w-20 h-20 rounded-full bg-surface-container border border-primary/20 flex items-center justify-center mb-6 relative">
                                        <span className="material-symbols-outlined text-primary text-3xl">{step.icon}</span>
                                        <span className="absolute -top-1 -right-1 w-6 h-6 gold-gradient rounded-full text-[10px] font-bold text-on-primary flex items-center justify-center">{step.number}</span>
                                    </div>
                                    <h4 className="font-headline text-primary font-bold text-base mb-2">{step.title}</h4>
                                    <p className="text-on-surface-variant text-sm font-light leading-relaxed">{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 8 — WHO NEEDS VASTU */}
                <section className="bg-background py-24 px-8">
                    <div className="max-w-7xl mx-auto text-center mb-16">
                        <h2 className="font-headline text-4xl text-primary font-bold">Who Benefits From Vastu?</h2>
                    </div>
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {useCases.map((item, i) => (
                            <div key={i} className="bg-surface-container border border-primary/8 rounded-xl p-8 flex gap-5">
                                <span className="material-symbols-outlined text-primary text-2xl mt-1">{item.icon}</span>
                                <div>
                                    <h3 className="font-headline text-primary font-bold mb-2">{item.title}</h3>
                                    <p className="text-on-surface-variant text-sm font-light leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SECTION 9 — REQUIREMENTS INFO CARD */}
                <section className="bg-surface py-24 px-8">
                    <div className="max-w-4xl mx-auto glass-card rounded-xl p-10 border border-primary/10">
                        <h4 className="font-headline text-2xl text-primary mb-8 flex items-center gap-3">
                            <span className="material-symbols-outlined">id_card</span>
                            What You'll Need to Provide
                        </h4>
                        <div className="space-y-8">
                            <div>
                                <p className="text-on-surface-variant/60 font-label text-[10px] uppercase tracking-widest mb-4">Always Required</p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-sm text-on-surface-variant font-light"><span className="material-symbols-outlined text-primary text-base">upload_file</span>Accurate floor plan of the property</li>
                                    <li className="flex items-center gap-3 text-sm text-on-surface-variant font-light"><span className="material-symbols-outlined text-primary text-base">videocam</span>Availability for a consultation call</li>
                                </ul>
                            </div>
                            {activeService === 'trikaal-vastu' && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                    <p className="text-on-surface-variant/60 font-label text-[10px] uppercase tracking-widest mb-4">For Trikaal Vastu</p>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3 text-sm text-on-surface-variant font-light"><span className="material-symbols-outlined text-primary text-base">person</span>Birth details of all residents (Residential)</li>
                                        <li className="flex items-center gap-3 text-sm text-on-surface-variant font-light"><span className="material-symbols-outlined text-primary text-base">badge</span>Birth details of business owner (Commercial)</li>
                                    </ul>
                                </motion.div>
                            )}
                            <div className="bg-primary/8 border border-primary/20 p-6 rounded-xl flex items-start gap-4">
                                <span className="material-symbols-outlined text-primary text-3xl shrink-0">warning</span>
                                <div>
                                    <p className="font-headline text-primary font-bold text-base mb-1">Details must be accurate.</p>
                                    <p className="text-on-surface-variant text-sm font-light leading-relaxed">Analysis is sensitive to measurements. {activeService === 'trikaal-vastu' && 'AED 150 per person charged for Jyotish analysis.'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 10 — AVAILABILITY */}
                <section className="bg-background py-24 px-8">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-surface-container border border-primary/10 rounded-xl p-8">
                            <h3 className="font-headline text-primary font-bold text-lg mb-6 flex items-center gap-3"><span className="material-symbols-outlined">location_on</span> On-Site Visits</h3>
                            <div className="space-y-3">
                                {['India (Gujarat)', 'UAE'].map((loc, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 bg-surface-container-high rounded-lg border border-primary/5">
                                        <span className="text-on-surface font-label text-sm">{loc}</span>
                                        <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-surface-container border border-primary/10 rounded-xl p-8">
                            <h3 className="font-headline text-primary font-bold text-lg mb-6 flex items-center gap-3"><span className="material-symbols-outlined">language</span> Online Consultations</h3>
                            <div className="p-4 bg-surface-container-high rounded-lg border border-primary/5 flex items-center gap-4">
                                <span className="material-symbols-outlined text-primary">public</span>
                                <span className="text-on-surface font-label text-sm font-medium">Available Worldwide</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 11 — FAQ ACCORDION */}
                <section className="bg-surface py-24 px-8">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="font-headline text-4xl text-primary font-bold">FAQ</h2>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-3">
                        <AnimatePresence mode="wait">
                            <motion.div key={activeService} animate={{ opacity: 1 }} initial={{ opacity: 0 }} className="space-y-4">
                                {faqs[activeService].map((faq, i) => (
                                    <div key={i} className="border border-primary/10 rounded-xl bg-surface-container overflow-hidden">
                                        <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-6 text-left flex justify-between items-center group">
                                            <span className="text-on-surface font-medium">{faq.q}</span>
                                            <span className={`material-symbols-outlined text-primary transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>expand_more</span>
                                        </button>
                                        <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="px-6 pb-6 text-on-surface-variant font-light text-sm leading-relaxed border-t border-primary/5 pt-4">
                                                {faq.a}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </section>

                {/* SECTION 12 — FINAL CTA BANNER */}
                <section className="bg-background py-24 px-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
                    <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} className="max-w-2xl mx-auto relative z-10">
                        <h2 className="font-headline text-5xl text-primary font-bold mb-6">Transform Your Space</h2>
                        <p className="text-on-surface-variant mb-10 text-lg">Align your energy flow for lasting harmony and peace.</p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center mt-10">
                            <Link to="/booking" className="gold-gradient text-on-primary px-10 py-5 rounded-full font-bold shadow-xl">Book Consultation</Link>
                            <Link to="/contact" className="px-10 py-5 rounded-full border border-primary/20 text-primary font-bold">Ask a Question</Link>
                        </div>
                    </motion.div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default VastuServices;

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

const Footer = () => {

    // ─── Newsletter state ─────────────────────────────────
    const [email, setEmail] = useState('')
    const [subscribeStatus, setSubscribeStatus] = useState(null)  // null | 'success' | 'error'
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubscribe = async (e) => {
        e.preventDefault()
        if (!email || !/\S+@\S+\.\S+/.test(email)) return
        setIsSubmitting(true)
        setSubscribeStatus(null)
        try {
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/newsletter/subscribe`,
                { email }
            )
            setSubscribeStatus('success')
            setEmail('')
        } catch (err) {
            console.error('Newsletter subscription error:', err)
            setSubscribeStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    // ─── Link data ────────────────────────────────────────
    const services = [
        { label: 'Trikaal Astrology Consultation', to: '/astrology' },
        { label: 'Vastu Consultation', to: '/vastu' },
        { label: 'Trikaal Vastu Consultation', to: '/vastu' },
        { label: 'Book a Session', to: '/booking' },
    ]

    const company = [
        { label: 'About Trikaal', to: '/about' },
        { label: 'Blog', to: '/blog' },
        { label: 'Contact Us', to: '/contact' },
        { label: 'Privacy Policy', to: '/privacy' },
        { label: 'Terms of Service', to: '/terms' },
        { label: 'Disclaimer', to: '/disclaimer' },
    ]

    const contactItems = [
        {
            icon: 'language',
            text: 'Online — Available Worldwide',
            href: null,
        },
        {
            icon: 'location_on',
            text: 'In-Person — Gujarat, India & UAE',
            href: null,
        },
        {
            icon: 'translate',
            text: 'English · Hindi · Gujarati',
            href: null,
        },
    ]

    // ─── Render ───────────────────────────────────────────
    return (
        <footer className="bg-surface border-t border-primary/8">

            {/* ── Main footer grid ──────────────────────────── */}
            <div className="max-w-7xl mx-auto px-8 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">

                    {/* ── Col 1: Brand (col-span-4) ──────────────── */}
                    <div className="lg:col-span-4">

                        {/* Logo */}
                        <Link to="/" className="inline-block mb-5">
                            <span className="font-headline text-3xl font-bold text-primary italic tracking-tight hover:opacity-80 transition-opacity">
                                Trikaal
                            </span>
                        </Link>

                        {/* Tagline */}
                        <p className="text-on-surface-variant/60 font-label text-xs tracking-[0.2em] uppercase mb-4">
                            A Modern Approach to Vedic Science
                        </p>

                        {/* Description */}
                        <p className="text-on-surface-variant font-body font-light text-sm leading-relaxed mb-8 max-w-xs">
                            Expert Jyotish Shastra & Vastu Shastra consultations — personalized,
                            confidential, and available to everyone, everywhere.
                        </p>

                        {/* Availability chips */}
                        <div className="flex flex-col gap-3 mb-8">
                            {contactItems.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-on-surface-variant/50 text-xs font-label">
                                    <span className="material-symbols-outlined text-primary/50 text-sm flex-shrink-0">
                                        {item.icon}
                                    </span>
                                    {item.text}
                                </div>
                            ))}
                        </div>

                        {/* Social icons */}
                        <div className="flex items-center gap-3">
                            {[
                                {
                                    icon: 'chat_bubble',
                                    label: 'WhatsApp',
                                    href: 'https://wa.me/',
                                },
                                {
                                    icon: 'camera_alt',
                                    label: 'Instagram',
                                    href: 'https://instagram.com/trikaal',
                                },
                                {
                                    icon: 'tag',
                                    label: 'Facebook',
                                    href: 'https://facebook.com/trikaal',
                                },
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-9 h-9 rounded-full border border-primary/15 bg-surface-container flex items-center justify-center text-on-surface-variant/50 hover:border-primary/40 hover:text-primary transition-all duration-200"
                                >
                                    <span className="material-symbols-outlined text-base">{social.icon}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* ── Col 2: Services (col-span-3) ───────────── */}
                    <div className="lg:col-span-3 lg:pl-8">
                        <h4 className="text-primary font-label text-xs font-bold uppercase tracking-[0.25em] mb-6">
                            Services
                        </h4>
                        <ul className="space-y-3">
                            {services.map((item, i) => (
                                <li key={i}>
                                    <Link
                                        to={item.to}
                                        className="group flex items-center gap-2 text-on-surface-variant/60 hover:text-primary transition-colors duration-200 text-sm font-light"
                                    >
                                        <span className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-300 flex-shrink-0" />
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Col 3: Company (col-span-2) ────────────── */}
                    <div className="lg:col-span-2">
                        <h4 className="text-primary font-label text-xs font-bold uppercase tracking-[0.25em] mb-6">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {company.map((item, i) => (
                                <li key={i}>
                                    <Link
                                        to={item.to}
                                        className="group flex items-center gap-2 text-on-surface-variant/60 hover:text-primary transition-colors duration-200 text-sm font-light"
                                    >
                                        <span className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-300 flex-shrink-0" />
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Col 4: Newsletter (col-span-3) ─────────── */}
                    <div className="lg:col-span-3">
                        <h4 className="text-primary font-label text-xs font-bold uppercase tracking-[0.25em] mb-3">
                            Weekly Oracle
                        </h4>
                        <p className="text-on-surface-variant/50 text-xs font-light leading-relaxed mb-5">
                            Receive Vedic insights, planetary updates & Vastu tips directly in your inbox.
                        </p>

                        {/* Newsletter form */}
                        <AnimatePresence mode="wait">
                            {subscribeStatus === 'success' ? (

                                /* Success state */
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-3 p-4 bg-green-900/20 border border-green-600/20 rounded-xl"
                                >
                                    <span
                                        className="material-symbols-outlined text-green-400 text-xl flex-shrink-0"
                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                    >
                                        check_circle
                                    </span>
                                    <div>
                                        <p className="text-green-400 text-sm font-label font-medium">Subscribed!</p>
                                        <p className="text-green-400/60 text-xs font-light">
                                            Cosmic wisdom is on its way.
                                        </p>
                                    </div>
                                </motion.div>

                            ) : (

                                /* Form state */
                                <motion.form
                                    key="form"
                                    onSubmit={handleSubscribe}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-3"
                                >
                                    <div className="relative">
                                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary/30 text-base pointer-events-none">
                                            mail
                                        </span>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                                if (subscribeStatus) setSubscribeStatus(null)
                                            }}
                                            placeholder="your@email.com"
                                            required
                                            className="w-full bg-surface-container border border-primary/15 focus:border-primary/40 rounded-full py-3 pl-10 pr-4 text-on-surface placeholder:text-on-surface-variant/25 text-sm outline-none transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.07)]"
                                        />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                                        className={`w-full py-3 rounded-full font-label font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 ${isSubmitting
                                            ? 'bg-primary/20 text-on-primary/40 cursor-not-allowed'
                                            : 'gold-gradient text-on-primary shadow-md hover:shadow-lg'
                                            }`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="w-3 h-3 rounded-full border-2 border-on-primary/20 border-t-on-primary animate-spin" />
                                                Subscribing...
                                            </>
                                        ) : (
                                            <>
                                                <span className="material-symbols-outlined text-sm">send</span>
                                                Subscribe
                                            </>
                                        )}
                                    </motion.button>

                                    {/* Error state */}
                                    <AnimatePresence>
                                        {subscribeStatus === 'error' && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center gap-1.5 text-red-400 text-xs"
                                            >
                                                <span className="material-symbols-outlined text-xs">error</span>
                                                Could not subscribe. Please try again.
                                            </motion.p>
                                        )}
                                    </AnimatePresence>

                                </motion.form>

                            )}
                        </AnimatePresence>

                        {/* Consultation quick link */}
                        <div className="mt-8 pt-6 border-t border-primary/8">
                            <p className="text-on-surface-variant/40 text-xs font-light mb-3">
                                Ready for a consultation?
                            </p>
                            <Link
                                to="/booking"
                                className="inline-flex items-center gap-2 text-primary font-label text-xs tracking-widest uppercase hover:gap-3 transition-all group"
                            >
                                <span className="material-symbols-outlined text-sm">calendar_month</span>
                                Book a Session
                                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                                    arrow_forward
                                </span>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            {/* ── Divider ────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-8">
                <div className="h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
            </div>

            {/* ── Sacred mantra line ─────────────────────────── */}
            <div className="py-5 text-center">
                <p
                    className="text-primary/30 text-sm tracking-[0.15em]"
                    style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                >
                    ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ।
                </p>
            </div>

            {/* ── Divider ────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-8">
                <div className="h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
            </div>

            {/* ── Bottom bar ─────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-8 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                    {/* Copyright */}
                    <p className="text-on-surface-variant/30 text-xs font-label">
                        © {new Date().getFullYear()} Trikaal. All rights reserved.
                    </p>

                    {/* Legal links */}
                    <div className="flex items-center gap-5">
                        {[
                            { label: 'Privacy Policy', to: '/privacy' },
                            { label: 'Terms of Service', to: '/terms' },
                            { label: 'Disclaimer', to: '/disclaimer' },
                        ].map((link, i) => (
                            <React.Fragment key={i}>
                                <Link
                                    to={link.to}
                                    className="text-on-surface-variant/30 hover:text-primary transition-colors text-xs font-label"
                                >
                                    {link.label}
                                </Link>
                                {i < 2 && (
                                    <span className="w-px h-3 bg-primary/15" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Made with */}
                    <p className="text-on-surface-variant/20 text-xs font-label flex items-center gap-1">
                        Made with
                        <span
                            className="material-symbols-outlined text-primary/30 text-xs"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            favorite
                        </span>
                        for Vedic Science
                    </p>

                </div>
            </div>

        </footer>
    )
}

export default Footer

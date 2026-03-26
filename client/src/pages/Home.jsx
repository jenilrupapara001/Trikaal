import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SEOHead from '../components/common/SEOHead';
import StarBackground from '../components/common/StarBackground';
import Loader from '../components/common/Loader';

const Home = () => {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await api.get('/settings');
                setSettings(response.data.settings);
            } catch (error) {
                console.error('Error fetching settings:', error);
            }
        };

        fetchSettings();
    }, []);

    const { data: servicesData } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const response = await api.get('/services');
            return response.data.services;
        },
    });

    const { data: testimonialsData } = useQuery({
        queryKey: ['testimonials'],
        queryFn: async () => {
            const response = await api.get('/testimonials');
            return response.data.testimonials;
        },
    });

    const { data: blogsData } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const response = await api.get('/blogs?limit=3');
            return response.data.blogs;
        },
    });

    const zodiacSigns = [
        { name: 'Aries', symbol: '♈', dates: 'Mar 21 - Apr 19' },
        { name: 'Taurus', symbol: '♉', dates: 'Apr 20 - May 20' },
        { name: 'Gemini', symbol: '♊', dates: 'May 21 - Jun 20' },
        { name: 'Cancer', symbol: '♋', dates: 'Jun 21 - Jul 22' },
        { name: 'Leo', symbol: '♌', dates: 'Jul 23 - Aug 22' },
        { name: 'Virgo', symbol: '♍', dates: 'Aug 23 - Sep 22' },
        { name: 'Libra', symbol: '♎', dates: 'Sep 23 - Oct 22' },
        { name: 'Scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21' },
        { name: 'Sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21' },
        { name: 'Capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19' },
        { name: 'Aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18' },
        { name: 'Pisces', symbol: '♓', dates: 'Feb 19 - Mar 20' },
    ];

    return (
        <>
            <SEOHead
                title="Vedic Astrology & Cosmic Guidance"
                description="Discover your cosmic destiny with expert Vedic astrology readings, tarot card consultations, and numerology services."
            />

            <div className="min-h-screen cosmic-bg">
                <StarBackground />
                <Navbar />

                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center pt-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                                <span className="gradient-text">
                                    {settings?.heroHeading || 'Begin Your Cosmic Journey'}
                                </span>
                            </h1>
                            <p className="font-body text-lg md:text-xl text-cosmic-lavender max-w-2xl mx-auto mb-10">
                                {settings?.heroSubheading || 'Discover the wisdom of the stars with personalized astrological guidance'}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/booking" className="btn-golden text-lg">
                                    Book a Reading
                                </Link>
                                <Link to="/horoscope" className="px-8 py-3 border-2 border-primary-gold text-primary-gold font-semibold rounded-lg hover:bg-primary-gold hover:text-cosmic-charcoal transition-all duration-300">
                                    Explore Horoscopes
                                </Link>
                            </div>
                        </motion.div>

                        {/* Animated zodiac symbols */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <motion.div
                                className="absolute top-1/4 left-10 text-primary-gold/20 text-6xl"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                            >
                                ✦
                            </motion.div>
                            <motion.div
                                className="absolute bottom-1/4 right-10 text-primary-gold/20 text-6xl"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                            >
                                ✦
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="section-padding relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-gold mb-4">
                                Our Services
                            </h2>
                            <div className="w-24 h-1 bg-primary-gold mx-auto"></div>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {servicesData?.slice(0, 6).map((service, index) => (
                                <motion.div
                                    key={service._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link to={`/services/${service.slug}`}>
                                        <div className="glass-card p-6 h-full hover:transform hover:-translate-y-2 transition-all duration-300">
                                            <div className="text-4xl mb-4">{service.icon}</div>
                                            <h3 className="font-display text-xl text-primary-gold mb-3">{service.title}</h3>
                                            <p className="font-body text-cosmic-lavender text-sm mb-4">
                                                {service.shortDescription}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <span className="font-accent text-primary-gold">{service.price}</span>
                                                <span className="font-body text-cosmic-lavender/60 text-sm">{service.duration}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Link to="/services" className="btn-golden">
                                View All Services
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Zodiac Wheel Section */}
                <section className="section-padding bg-cosmic-charcoal/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-gold mb-4">
                                Explore Your Zodiac Sign
                            </h2>
                            <p className="font-body text-cosmic-lavender max-w-2xl mx-auto">
                                Click on any sign to discover your daily horoscope
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {zodiacSigns.map((sign, index) => (
                                <motion.div
                                    key={sign.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link to={`/horoscope/${sign.name.toLowerCase()}`}>
                                        <div className="glass-card p-4 text-center hover:transform hover:-translate-y-2 hover:border-primary-gold/50 transition-all duration-300 cursor-pointer">
                                            <div className="text-3xl mb-2">{sign.symbol}</div>
                                            <h3 className="font-display text-primary-gold text-sm">{sign.name}</h3>
                                            <p className="font-body text-cosmic-lavender/60 text-xs mt-1">{sign.dates}</p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="section-padding">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-gold mb-4">
                                What Our Clients Say
                            </h2>
                            <div className="w-24 h-1 bg-primary-gold mx-auto"></div>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonialsData?.slice(0, 3).map((testimonial, index) => (
                                <motion.div
                                    key={testimonial._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="glass-card p-6">
                                        <div className="flex mb-4">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <span key={i} className="text-primary-gold">★</span>
                                            ))}
                                        </div>
                                        <p className="font-body text-cosmic-lavender mb-4">"{testimonial.content}"</p>
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-primary-gold/20 flex items-center justify-center">
                                                <span className="text-primary-gold font-display">{testimonial.name[0]}</span>
                                            </div>
                                            <div className="ml-3">
                                                <p className="font-display text-primary-gold text-sm">{testimonial.name}</p>
                                                {testimonial.location && (
                                                    <p className="font-body text-cosmic-lavender/60 text-xs">{testimonial.location}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="section-padding bg-gradient-to-r from-cosmic-purple-mid to-cosmic-purple">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                                Begin Your Cosmic Journey Today
                            </h2>
                            <p className="font-body text-cosmic-lavender mb-8">
                                Let the stars guide you towards your true destiny
                            </p>
                            <Link to="/booking" className="btn-golden text-lg">
                                Book a Reading
                            </Link>
                        </motion.div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default Home;

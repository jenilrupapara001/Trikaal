import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import api from '../services/api';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SEOHead from '../components/common/SEOHead';
import StarBackground from '../components/common/StarBackground';
import Loader from '../components/common/Loader';

const Services = () => {
    const [filter, setFilter] = useState('all');

    const { data: services, isLoading } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const response = await api.get('/services');
            return response.data.services;
        },
    });

    const categories = ['all', 'vedic', 'western', 'numerology', 'tarot', 'vastu', 'kundali', 'compatibility'];

    const filteredServices = filter === 'all'
        ? services
        : services?.filter(s => s.category === filter);

    return (
        <>
            <SEOHead
                title="Astrology Services"
                description="Explore our range of astrology services including natal chart readings, tarot readings, numerology, and more."
            />

            <div className="min-h-screen cosmic-bg">
                <StarBackground />
                <Navbar />

                <section className="pt-32 pb-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-16"
                        >
                            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-gold mb-4">
                                Our Services
                            </h1>
                            <p className="font-body text-cosmic-lavender text-lg max-w-2xl mx-auto">
                                Discover the cosmic insights you need with our expert astrology services
                            </p>
                        </motion.div>

                        {/* Filter */}
                        <div className="flex flex-wrap justify-center gap-2 mb-12">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-4 py-2 rounded-full font-body text-sm transition-all ${filter === cat
                                            ? 'bg-primary-gold text-cosmic-charcoal'
                                            : 'glass-card text-cosmic-lavender hover:text-primary-gold'
                                        }`}
                                >
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </button>
                            ))}
                        </div>

                        {isLoading ? (
                            <Loader />
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredServices?.map((service, index) => (
                                    <motion.div
                                        key={service._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
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
                        )}
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default Services;

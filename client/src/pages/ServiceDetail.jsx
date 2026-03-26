import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import api from '../services/api';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SEOHead from '../components/common/SEOHead';
import StarBackground from '../components/common/StarBackground';
import Loader from '../components/common/Loader';

const ServiceDetail = () => {
    const { slug } = useParams();

    const { data: service, isLoading } = useQuery({
        queryKey: ['service', slug],
        queryFn: async () => {
            const response = await api.get(`/services/${slug}`);
            return response.data.service;
        },
    });

    if (isLoading) {
        return (
            <div className="min-h-screen cosmic-bg">
                <StarBackground />
                <Navbar />
                <div className="pt-32">
                    <Loader />
                </div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen cosmic-bg">
                <StarBackground />
                <Navbar />
                <div className="pt-32 text-center">
                    <h1 className="font-display text-2xl text-primary-gold">Service not found</h1>
                    <Link to="/services" className="btn-golden mt-4 inline-block">Back to Services</Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEOHead
                title={service.title}
                description={service.shortDescription}
            />

            <div className="min-h-screen cosmic-bg">
                <StarBackground />
                <Navbar />

                <section className="pt-32 pb-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Link to="/services" className="text-primary-gold hover:text-gold-light mb-4 inline-block">
                                ← Back to Services
                            </Link>

                            <div className="glass-card p-8">
                                <div className="text-6xl mb-6">{service.icon}</div>
                                <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-gold mb-4">
                                    {service.title}
                                </h1>

                                <div className="flex flex-wrap gap-4 mb-6">
                                    <span className="px-4 py-2 bg-primary-gold/20 text-primary-gold rounded-full font-body text-sm">
                                        {service.category}
                                    </span>
                                    <span className="px-4 py-2 bg-cosmic-purple-mid text-cosmic-lavender rounded-full font-body text-sm">
                                        {service.price}
                                    </span>
                                    <span className="px-4 py-2 bg-cosmic-purple-mid text-cosmic-lavender rounded-full font-body text-sm">
                                        {service.duration}
                                    </span>
                                </div>

                                <div className="prose prose-invert max-w-none mb-8">
                                    <p className="font-body text-cosmic-lavender text-lg">
                                        {service.fullDescription}
                                    </p>
                                </div>

                                {/* FAQs */}
                                {service.faqs && service.faqs.length > 0 && (
                                    <div className="mt-8">
                                        <h2 className="font-display text-2xl text-primary-gold mb-4">FAQs</h2>
                                        {service.faqs.map((faq, index) => (
                                            <div key={index} className="mb-4">
                                                <h3 className="font-body text-primary-gold font-semibold">{faq.question}</h3>
                                                <p className="font-body text-cosmic-lavender">{faq.answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-8 pt-8 border-t border-primary-gold/20">
                                    <Link to={`/booking?service=${service._id}`} className="btn-golden text-lg">
                                        Book This Service
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default ServiceDetail;

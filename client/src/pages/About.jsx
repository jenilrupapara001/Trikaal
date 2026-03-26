import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SEOHead from '../components/common/SEOHead';
import StarBackground from '../components/common/StarBackground';

const About = () => {
    return (
        <>
            <SEOHead
                title="About Us"
                description="Learn about CosmicGuru - your trusted source for Vedic astrology and cosmic guidance."
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
                            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-gold mb-6">
                                About CosmicGuru
                            </h1>
                            <p className="font-body text-cosmic-lavender text-lg max-w-3xl mx-auto">
                                Bridging ancient wisdom with modern understanding to help you discover your cosmic destiny
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="glass-card p-8">
                                    <div className="w-full h-80 bg-gradient-to-br from-primary-gold/20 to-cosmic-purple/20 rounded-lg flex items-center justify-center">
                                        <span className="text-8xl">🔮</span>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h2 className="font-display text-2xl text-primary-gold mb-4">
                                    Our Mission
                                </h2>
                                <p className="font-body text-cosmic-lavender mb-6">
                                    At CosmicGuru, we believe that understanding the cosmic influences in your life can help you make better decisions and live a more fulfilling life. Our mission is to make ancient Vedic astrology accessible to everyone seeking guidance on their life journey.
                                </p>
                                <p className="font-body text-cosmic-lavender mb-6">
                                    With years of experience in Vedic astrology, tarot reading, and numerology, we provide accurate and insightful readings that help our clients navigate life's challenges with confidence.
                                </p>
                            </motion.div>
                        </div>

                        {/* Why Choose Us */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="font-display text-3xl font-bold text-primary-gold mb-4">
                                Why Choose Us
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                            {[
                                { icon: '🌟', title: 'Expert Guidance', desc: 'Years of experience in Vedic astrology and ancient wisdom' },
                                { icon: '💫', title: 'Personalized Readings', desc: 'Tailored to your unique birth chart and life situation' },
                                { icon: '🤝', title: 'Trusted by Many', desc: 'Served thousands of satisfied clients worldwide' },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="glass-card p-6 text-center">
                                        <div className="text-4xl mb-4">{item.icon}</div>
                                        <h3 className="font-display text-xl text-primary-gold mb-2">{item.title}</h3>
                                        <p className="font-body text-cosmic-lavender text-sm">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <h3 className="font-display text-2xl text-white mb-6">Ready to Discover Your Destiny?</h3>
                            <Link to="/booking" className="btn-golden">
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

export default About;

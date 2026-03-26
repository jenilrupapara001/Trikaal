import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import api from '../services/api';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SEOHead from '../components/common/SEOHead';
import StarBackground from '../components/common/StarBackground';
import Loader from '../components/common/Loader';

const zodiacInfo = {
    aries: { name: 'Aries', symbol: '♈', dates: 'Mar 21 - Apr 19', element: 'Fire', planet: 'Mars' },
    taurus: { name: 'Taurus', symbol: '♉', dates: 'Apr 20 - May 20', element: 'Earth', planet: 'Venus' },
    gemini: { name: 'Gemini', symbol: '♊', dates: 'May 21 - Jun 20', element: 'Air', planet: 'Mercury' },
    cancer: { name: 'Cancer', symbol: '♋', dates: 'Jun 21 - Jul 22', element: 'Water', planet: 'Moon' },
    leo: { name: 'Leo', symbol: '♌', dates: 'Jul 23 - Aug 22', element: 'Fire', planet: 'Sun' },
    virgo: { name: 'Virgo', symbol: '♍', dates: 'Aug 23 - Sep 22', element: 'Earth', planet: 'Mercury' },
    libra: { name: 'Libra', symbol: '♎', dates: 'Sep 23 - Oct 22', element: 'Air', planet: 'Venus' },
    scorpio: { name: 'Scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21', element: 'Water', planet: 'Pluto' },
    sagittarius: { name: 'Sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21', element: 'Fire', planet: 'Jupiter' },
    capricorn: { name: 'Capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19', element: 'Earth', planet: 'Saturn' },
    aquarius: { name: 'Aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18', element: 'Air', planet: 'Uranus' },
    pisces: { name: 'Pisces', symbol: '♓', dates: 'Feb 19 - Mar 20', element: 'Water', planet: 'Neptune' },
};

const HoroscopeDetail = () => {
    const { sign } = useParams();
    const [type, setType] = useState('daily');

    const signInfo = zodiacInfo[sign?.toLowerCase()] || zodiacInfo.aries;

    const { data: horoscopeData, isLoading } = useQuery({
        queryKey: ['horoscope', sign, type],
        queryFn: async () => {
            const response = await api.get(`/horoscopes/${sign}/${type}`);
            return response.data.horoscope;
        },
    });

    return (
        <>
            <SEOHead
                title={`${signInfo.name} Horoscope Today`}
                description={`Daily ${signInfo.name} horoscope reading and astrological predictions.`}
            />

            <div className="min-h-screen cosmic-bg">
                <StarBackground />
                <Navbar />

                <section className="pt-32 pb-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link to="/horoscope" className="text-primary-gold hover:text-gold-light mb-4 inline-block">
                            ← Back to All Signs
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-8"
                        >
                            <div className="text-7xl mb-4">{signInfo.symbol}</div>
                            <h1 className="font-display text-4xl font-bold text-primary-gold mb-2">
                                {signInfo.name}
                            </h1>
                            <p className="font-body text-cosmic-lavender">{signInfo.dates}</p>
                        </motion.div>

                        <div className="flex justify-center gap-4 mb-8">
                            {['daily', 'weekly', 'monthly'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setType(t)}
                                    className={`px-6 py-2 rounded-full font-body text-sm transition-all ${type === t
                                            ? 'bg-primary-gold text-cosmic-charcoal'
                                            : 'glass-card text-cosmic-lavender hover:text-primary-gold'
                                        }`}
                                >
                                    {t.charAt(0).toUpperCase() + t.slice(1)}
                                </button>
                            ))}
                        </div>

                        {isLoading ? (
                            <Loader />
                        ) : (
                            <motion.div
                                key={type}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="glass-card p-8"
                            >
                                {horoscopeData ? (
                                    <>
                                        <div className="prose prose-invert max-w-none mb-8">
                                            <p className="font-body text-cosmic-lavender text-lg leading-relaxed">
                                                {horoscopeData.content}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="p-4 bg-cosmic-purple-mid/30 rounded-lg text-center">
                                                <p className="font-accent text-cosmic-lavender/60 text-xs mb-1">Lucky Color</p>
                                                <p className="font-display text-primary-gold">{horoscopeData.luckyColor || 'N/A'}</p>
                                            </div>
                                            <div className="p-4 bg-cosmic-purple-mid/30 rounded-lg text-center">
                                                <p className="font-accent text-cosmic-lavender/60 text-xs mb-1">Lucky Number</p>
                                                <p className="font-display text-primary-gold">{horoscopeData.luckyNumber || 'N/A'}</p>
                                            </div>
                                            <div className="p-4 bg-cosmic-purple-mid/30 rounded-lg text-center">
                                                <p className="font-accent text-cosmic-lavender/60 text-xs mb-1">Element</p>
                                                <p className="font-display text-primary-gold">{signInfo.element}</p>
                                            </div>
                                            <div className="p-4 bg-cosmic-purple-mid/30 rounded-lg text-center">
                                                <p className="font-accent text-cosmic-lavender/60 text-xs mb-1">Ruling Planet</p>
                                                <p className="font-display text-primary-gold">{signInfo.planet}</p>
                                            </div>
                                        </div>

                                        {horoscopeData.compatibility && (
                                            <div className="mt-6 p-4 bg-cosmic-purple-mid/30 rounded-lg">
                                                <p className="font-accent text-cosmic-lavender/60 text-xs mb-1">Best Compatibility</p>
                                                <p className="font-display text-primary-gold capitalize">{horoscopeData.compatibility}</p>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <p className="text-center text-cosmic-lavender">
                                        No {type} horoscope available for {signInfo.name} yet.
                                    </p>
                                )}
                            </motion.div>
                        )}
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default HoroscopeDetail;

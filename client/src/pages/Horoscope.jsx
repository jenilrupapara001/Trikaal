import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SEOHead from '../components/common/SEOHead';
import StarBackground from '../components/common/StarBackground';

const zodiacSigns = [
    { name: 'Aries', symbol: '♈', dates: 'Mar 21 - Apr 19', element: 'Fire', planet: 'Mars' },
    { name: 'Taurus', symbol: '♉', dates: 'Apr 20 - May 20', element: 'Earth', planet: 'Venus' },
    { name: 'Gemini', symbol: '♊', dates: 'May 21 - Jun 20', element: 'Air', planet: 'Mercury' },
    { name: 'Cancer', symbol: '♋', dates: 'Jun 21 - Jul 22', element: 'Water', planet: 'Moon' },
    { name: 'Leo', symbol: '♌', dates: 'Jul 23 - Aug 22', element: 'Fire', planet: 'Sun' },
    { name: 'Virgo', symbol: '♍', dates: 'Aug 23 - Sep 22', element: 'Earth', planet: 'Mercury' },
    { name: 'Libra', symbol: '♎', dates: 'Sep 23 - Oct 22', element: 'Air', planet: 'Venus' },
    { name: 'Scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21', element: 'Water', planet: 'Pluto' },
    { name: 'Sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21', element: 'Fire', planet: 'Jupiter' },
    { name: 'Capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19', element: 'Earth', planet: 'Saturn' },
    { name: 'Aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18', element: 'Air', planet: 'Uranus' },
    { name: 'Pisces', symbol: '♓', dates: 'Feb 19 - Mar 20', element: 'Water', planet: 'Neptune' },
];

const Horoscope = () => {
    return (
        <>
            <SEOHead
                title="Daily Horoscope"
                description="Discover your daily, weekly, and monthly horoscope readings for all 12 zodiac signs."
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
                                Daily Horoscope
                            </h1>
                            <p className="font-body text-cosmic-lavender text-lg max-w-2xl mx-auto">
                                Discover what the stars have in store for you today
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {zodiacSigns.map((sign, index) => (
                                <motion.div
                                    key={sign.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link to={`/horoscope/${sign.name.toLowerCase()}`}>
                                        <div className="glass-card p-6 text-center hover:transform hover:-translate-y-2 hover:border-primary-gold/50 transition-all duration-300 cursor-pointer h-full">
                                            <div className="text-5xl mb-3">{sign.symbol}</div>
                                            <h3 className="font-display text-xl text-primary-gold mb-1">{sign.name}</h3>
                                            <p className="font-body text-cosmic-lavender/60 text-sm mb-2">{sign.dates}</p>
                                            <div className="flex justify-center gap-2 text-xs text-cosmic-lavender/80">
                                                <span className="px-2 py-1 bg-cosmic-purple-mid/50 rounded">{sign.element}</span>
                                                <span className="px-2 py-1 bg-cosmic-purple-mid/50 rounded">{sign.planet}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default Horoscope;

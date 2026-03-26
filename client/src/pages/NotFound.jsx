import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/common/SEOHead';
import StarBackground from '../components/common/StarBackground';

const NotFound = () => {
    return (
        <>
            <SEOHead title="Page Not Found" />

            <div className="min-h-screen cosmic-bg flex items-center justify-center">
                <StarBackground />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center px-4 relative z-10"
                >
                    <h1 className="font-display text-9xl font-bold text-primary-gold mb-4">404</h1>
                    <p className="font-display text-2xl text-cosmic-lavender mb-8">
                        The stars have led you astray
                    </p>
                    <p className="text-cosmic-lavender mb-8 max-w-md mx-auto">
                        The page you're looking for doesn't exist in this universe.
                    </p>
                    <Link to="/" className="btn-golden">
                        Return Home
                    </Link>
                </motion.div>
            </div>
        </>
    );
};

export default NotFound;

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/home/HeroSection';
import MarqueeStrip from '../components/home/MarqueeStrip';
import MantraSection from '../components/home/MantraSection';
import WhoCanBenefit from '../components/home/WhoCanBenefit';
import ServicesSection from '../components/home/ServicesSection';
import HowItWorks from '../components/home/HowItWorks';
import MeetSmeet from '../components/home/MeetSmeet';
import LifeAreas from '../components/home/LifeAreas';
import PricingOverview from '../components/home/PricingOverview';
import Testimonials from '../components/home/Testimonials';
import TrustStats from '../components/home/TrustStats';
import BlogTeaser from '../components/home/BlogTeaser';
import FinalCTA from '../components/home/FinalCTA';

const LandingPage = () => {
    return (
        <div className="bg-background min-h-screen text-on-surface selection:bg-primary/30 selection:text-primary">
            <Navbar />
            
            {/* 1. Hero Section */}
            <HeroSection />

            {/* 2. Marquee Strip */}
            <MarqueeStrip />

            {/* 3. Sacred Mantra Section */}
            <MantraSection />

            {/* 4. Who Can Benefit? */}
            <WhoCanBenefit />

            {/* 5. Our 3 Services */}
            <ServicesSection />

            {/* 6. Marquee Strip (Repeat for rhythm) */}
            <MarqueeStrip />

            {/* 7. How It Works (The Process) */}
            <HowItWorks />

            {/* 8. Meet Smeet (The Consultant) */}
            <MeetSmeet />

            {/* 9. Life Areas We Cover */}
            <LifeAreas />

            {/* 10. Pricing Overview */}
            <PricingOverview />

            {/* 11. Testimonials */}
            <Testimonials />

            {/* 12. Trust Stats Bar */}
            <TrustStats />

            {/* 13. Blog Teaser */}
            <BlogTeaser />

            {/* 14. Final CTA Banner */}
            <FinalCTA />

            <Footer />
        </div>
    );
};

export default LandingPage;

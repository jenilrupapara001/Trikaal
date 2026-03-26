import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isActive = (path) => location.pathname === path;

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Vastu', path: '/vastu' },
        { name: 'Astrology', path: '/astrology' },
        { name: 'Wisdom', path: '/blog' }
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#200436]/80 backdrop-blur-xl border-b border-white/5">
            <nav className="flex justify-between items-center px-4 md:px-8 py-4 max-w-7xl mx-auto">
                <Link to="/" className="text-xl md:text-2xl font-bold text-[#e6c364] font-headline italic">
                    Trikaal
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`${isActive(item.path) ? 'text-[#e6c364] border-b-2 border-[#e6c364]' : 'text-[#d0c5b2] hover:text-[#e6c364]'} pb-1 font-headline tracking-wide transition-all hover:scale-105`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <Link to="/booking" className="hidden md:block gold-gradient text-on-primary px-4 md:px-6 py-2 md:py-2.5 rounded-full font-semibold hover:scale-105 shadow-xl transition-all text-sm md:text-base">
                        Book Session
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-[#e6c364] p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className="material-symbols-outlined text-2xl">
                            {mobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-[#200436] border-b border-white/10 p-4 flex flex-col gap-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`${isActive(item.path) ? 'text-[#e6c364]' : 'text-[#d0c5b2]'} py-2 font-headline text-lg`}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            to="/booking"
                            onClick={() => setMobileMenuOpen(false)}
                            className="gold-gradient text-on-primary px-6 py-3 rounded-full font-semibold text-center mt-2"
                        >
                            Book Session
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;

import React from 'react';
import { motion } from 'framer-motion';

const BlogTeaser = () => {
    const blogs = [
        {
            category: 'Jyotish Shastra',
            title: 'Understanding Your Birth Chart: A Beginner\'s Guide',
            excerpt: 'Your Kundli is a cosmic map of your soul. Learn the key elements that shape your destiny.',
            date: 'March 2024',
            readTime: '5 min read',
            icon: 'auto_awesome'
        },
        {
            category: 'Vastu Shastra',
            title: 'The 5 Vastu Zones Every Home Should Optimise',
            excerpt: 'Discover how aligning these five spatial zones can radically shift the energy in your home.',
            date: 'February 2024',
            readTime: '7 min read',
            icon: 'home_work'
        },
        {
            category: 'Remedies',
            title: 'Gemstones and Astrology: How to Choose the Right Stone',
            excerpt: 'Not every gemstone is for everyone. Learn how your chart determines the right cosmic amplifier.',
            date: 'January 2024',
            readTime: '6 min read',
            icon: 'diamond'
        }
    ];

    return (
        <section className="bg-background py-32 px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span className="text-primary font-label text-xs tracking-[0.3em] uppercase block mb-3">
                            Vedic Wisdom
                        </span>
                        <h2 className="font-headline text-5xl text-primary font-bold">
                            From Our Journal
                        </h2>
                    </div>
                    <a href="/blog" className="flex items-center gap-2 text-primary font-label text-sm tracking-widest uppercase hover:gap-4 transition-all pb-2 border-b border-primary/20">
                        View All Articles
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, i) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-surface-container border border-primary/10 rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300 group flex flex-col"
                        >
                            <div className="h-48 bg-surface-container-high flex items-center justify-center border-b border-primary/5 hover:bg-primary/5 transition-colors duration-500">
                                <span className="material-symbols-outlined text-primary/20 text-6xl group-hover:scale-110 group-hover:text-primary/40 transition-all duration-500">{blog.icon}</span>
                            </div>

                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="px-3 py-1 rounded-full border border-primary/20 text-primary font-label text-[10px] tracking-widest uppercase">
                                        {blog.category}
                                    </span>
                                    <span className="text-on-surface-variant/40 font-label text-[10px] flex items-center gap-1 uppercase tracking-tighter">
                                        <span className="material-symbols-outlined text-xs">schedule</span>
                                        {blog.readTime}
                                    </span>
                                </div>

                                <h3 className="font-headline text-xl text-primary font-bold mb-3 group-hover:text-primary transition-colors">
                                    {blog.title}
                                </h3>
                                <p className="text-on-surface-variant text-sm font-light leading-relaxed flex-1 mb-8 opacity-70">
                                    {blog.excerpt}
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-primary/5">
                                    <span className="text-on-surface-variant/40 text-[10px] font-label uppercase font-bold">{blog.date}</span>
                                    <a href="/blog" className="flex items-center gap-1 text-primary font-label text-[10px] tracking-widest uppercase font-bold group-hover:gap-2 transition-all">
                                        Read Deeply
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </a>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogTeaser;

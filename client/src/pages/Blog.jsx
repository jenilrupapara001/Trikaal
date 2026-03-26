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

const Blog = () => {
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState('');

    const { data: blogsData, isLoading } = useQuery({
        queryKey: ['blogs', page, category],
        queryFn: async () => {
            const params = new URLSearchParams();
            params.append('page', page);
            params.append('limit', 9);
            if (category) params.append('category', category);
            const response = await api.get(`/blogs?${params}`);
            return response.data;
        },
    });

    const categories = ['', 'vedic', 'western', 'numerology', 'tarot', 'vastu', 'Spirituality', 'Lifestyle'];

    return (
        <>
            <SEOHead
                title="Astrology Blog"
                description="Read the latest articles on astrology, tarot, numerology, and spiritual growth."
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
                                Astrology Blog
                            </h1>
                            <p className="font-body text-cosmic-lavender text-lg max-w-2xl mx-auto">
                                Explore articles on astrology, spiritual growth, and cosmic wisdom
                            </p>
                        </motion.div>

                        {/* Filter */}
                        <div className="flex flex-wrap justify-center gap-2 mb-12">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => { setCategory(cat); setPage(1); }}
                                    className={`px-4 py-2 rounded-full font-body text-sm transition-all ${category === cat
                                            ? 'bg-primary-gold text-cosmic-charcoal'
                                            : 'glass-card text-cosmic-lavender hover:text-primary-gold'
                                        }`}
                                >
                                    {cat || 'All'}
                                </button>
                            ))}
                        </div>

                        {isLoading ? (
                            <Loader />
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {blogsData?.blogs?.map((blog, index) => (
                                        <motion.div
                                            key={blog._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link to={`/blog/${blog.slug}`}>
                                                <div className="glass-card overflow-hidden h-full hover:transform hover:-translate-y-2 transition-all duration-300">
                                                    {blog.featuredImage && (
                                                        <div className="h-48 overflow-hidden">
                                                            <img
                                                                src={blog.featuredImage}
                                                                alt={blog.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="p-6">
                                                        <span className="text-xs text-primary-gold uppercase tracking-wider">
                                                            {blog.category}
                                                        </span>
                                                        <h3 className="font-display text-xl text-primary-gold mt-2 mb-3 line-clamp-2">
                                                            {blog.title}
                                                        </h3>
                                                        <p className="font-body text-cosmic-lavender text-sm line-clamp-3">
                                                            {blog.excerpt}
                                                        </p>
                                                        <div className="mt-4 flex justify-between items-center text-xs text-cosmic-lavender/60">
                                                            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                                            <span>{blog.readTime} min read</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {blogsData?.pagination?.pages > 1 && (
                                    <div className="flex justify-center gap-2 mt-12">
                                        {[...Array(blogsData.pagination.pages)].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setPage(i + 1)}
                                                className={`w-10 h-10 rounded-full font-body text-sm transition-all ${page === i + 1
                                                        ? 'bg-primary-gold text-cosmic-charcoal'
                                                        : 'glass-card text-cosmic-lavender hover:text-primary-gold'
                                                    }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default Blog;

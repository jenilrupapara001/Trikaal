import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import api from '../services/api';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SEOHead from '../components/common/SEOHead';
import StarBackground from '../components/common/StarBackground';
import Loader from '../components/common/Loader';

const BlogPost = () => {
    const { slug } = useParams();

    const { data: blog, isLoading } = useQuery({
        queryKey: ['blog', slug],
        queryFn: async () => {
            const response = await api.get(`/blogs/${slug}`);
            return response.data.blog;
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

    if (!blog) {
        return (
            <div className="min-h-screen cosmic-bg">
                <StarBackground />
                <Navbar />
                <div className="pt-32 text-center">
                    <h1 className="font-display text-2xl text-primary-gold">Blog not found</h1>
                    <Link to="/blog" className="btn-golden mt-4 inline-block">Back to Blog</Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEOHead
                title={blog.metaTitle || blog.title}
                description={blog.metaDescription || blog.excerpt}
                image={blog.ogImage}
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
                            <Link to="/blog" className="text-primary-gold hover:text-gold-light mb-4 inline-block">
                                ← Back to Blog
                            </Link>

                            {blog.featuredImage && (
                                <img
                                    src={blog.featuredImage}
                                    alt={blog.title}
                                    className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
                                />
                            )}

                            <div className="flex gap-4 mb-4">
                                <span className="px-3 py-1 bg-primary-gold/20 text-primary-gold rounded-full font-body text-xs">
                                    {blog.category}
                                </span>
                                <span className="text-cosmic-lavender/60 font-body text-xs">
                                    {new Date(blog.createdAt).toLocaleDateString()}
                                </span>
                                <span className="text-cosmic-lavender/60 font-body text-xs">
                                    {blog.readTime} min read
                                </span>
                            </div>

                            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-gold mb-6">
                                {blog.title}
                            </h1>

                            <div className="flex items-center mb-8">
                                <div className="w-10 h-10 rounded-full bg-primary-gold/20 flex items-center justify-center">
                                    <span className="text-primary-gold font-display">{blog.author?.[0] || 'A'}</span>
                                </div>
                                <span className="ml-3 text-cosmic-lavender font-body">{blog.author}</span>
                            </div>

                            <div
                                className="prose prose-invert max-w-none glass-card p-8"
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            />

                            {blog.tags && blog.tags.length > 0 && (
                                <div className="mt-8">
                                    <p className="text-cosmic-lavender/60 text-sm mb-2">Tags:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {blog.tags.map((tag, index) => (
                                            <span key={index} className="px-3 py-1 bg-cosmic-purple-mid text-cosmic-lavender rounded-full text-xs">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default BlogPost;

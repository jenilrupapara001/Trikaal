import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const CATEGORIES = ['All', 'Astrology', 'Vastu', 'Jyotish', 'Numerology', 'Remedies', 'Philosophy', 'Festivals']

// ─── Sidebar Widgets ────────────────────────────────────────

const PopularPostsWidget = () => {
  const [popular, setPopular] = useState([])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogs?limit=5&sort=views`)
      .then(res => setPopular(res.data.blogs || []))
      .catch(() => setPopular([]))
  }, [])

  return (
    <div className="bg-surface-container border border-primary/10 rounded-xl p-6">
      <h4 className="font-headline text-primary text-lg font-bold mb-5 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
        Popular Articles
      </h4>
      <div className="space-y-4">
        {popular.length === 0
          ? [...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-16 h-16 rounded-lg bg-surface-container-high flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-surface-container-high rounded-full w-full" />
                  <div className="h-3 bg-surface-container-high rounded-full w-3/4" />
                </div>
              </div>
            ))
          : popular.map((post, i) => (
              <Link key={post._id} to={`/blog/${post.slug}`} className="flex gap-3 group">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container-high">
                  <img src={post.featuredImage} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-primary/40 font-label text-xs font-bold">0{i + 1}</span>
                  </div>
                  <p className="text-on-surface-variant text-xs font-label leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </p>
                </div>
              </Link>
            ))
        }
      </div>
    </div>
  )
}

const CategoriesWidget = ({ categories, activeCategory, onSelect }) => (
  <div className="bg-surface-container border border-primary/10 rounded-xl p-6">
    <h4 className="font-headline text-primary text-lg font-bold mb-5 flex items-center gap-2">
      <span className="material-symbols-outlined text-primary text-xl">category</span>
      Categories
    </h4>
    <div className="space-y-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat === activeCategory ? 'All' : cat)}
          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-label transition-all ${
            activeCategory === cat
              ? 'bg-primary/15 border border-primary/25 text-primary'
              : 'hover:bg-surface-container-high text-on-surface-variant hover:text-primary border border-transparent'
          }`}
        >
          <span>{cat}</span>
          {activeCategory === cat && (
            <span className="material-symbols-outlined text-primary text-sm">check</span>
          )}
        </button>
      ))}
    </div>
  </div>
)

const NewsletterWidget = ({ email, setEmail }) => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !/\S+@\S+\.\S+/.test(email)) return
    // TODO: connect to newsletter API endpoint
    setSubmitted(true)
  }

  return (
    <div className="bg-surface-container border border-primary/15 rounded-xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />
      <div className="relative z-10">
        <span className="material-symbols-outlined text-primary text-3xl mb-3 block opacity-60"
          style={{ fontVariationSettings: "'FILL' 1" }}>
          mail
        </span>
        <h4 className="font-headline text-primary text-lg font-bold mb-2">
          Cosmic Wisdom, Weekly
        </h4>
        <p className="text-on-surface-variant text-xs font-light mb-5 leading-relaxed">
          Receive curated Vedic insights, planetary updates, and Vastu tips directly in your inbox.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0  }}
            className="flex items-center gap-2 text-primary text-sm font-label"
          >
            <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            You're subscribed!
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-surface-container-high border border-primary/15 focus:border-primary/40 rounded-full py-3 px-5 text-on-surface placeholder:text-on-surface-variant/30 text-sm outline-none transition-all"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-full gold-gradient text-on-primary font-label font-bold text-xs tracking-widest uppercase hover:scale-[1.02] transition-transform shadow-md"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

const ConsultationWidget = () => (
  <div className="bg-surface-container-high border border-primary/15 rounded-xl p-6 text-center relative overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-40 h-40 bg-primary/5 rounded-full blur-[50px]" />
    </div>
    <div className="relative z-10">
      <span className="material-symbols-outlined text-primary text-4xl mb-4 block opacity-50"
        style={{ fontVariationSettings: "'FILL' 1" }}>
        auto_awesome
      </span>
      <h4 className="font-headline text-primary text-xl font-bold mb-3">
        Ready for Guidance?
      </h4>
      <p className="text-on-surface-variant text-xs font-light leading-relaxed mb-6">
        Book a personalized Trikaal Astrology or Vastu consultation with Smeet.
      </p>
      <Link
        to="/booking"
        className="inline-flex items-center gap-2 gold-gradient text-on-primary px-6 py-3 rounded-full font-label font-bold text-xs tracking-widest uppercase hover:scale-105 transition-transform shadow-lg"
      >
        <span className="material-symbols-outlined text-sm">calendar_month</span>
        Book Now
      </Link>
    </div>
  </div>
)

// ─── Main Page ──────────────────────────────────────────────

const BlogPage = () => {
  const [posts,          setPosts]          = useState([])
  const [isLoading,      setIsLoading]      = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery,    setSearchQuery]    = useState('')
  const [searchInput,    setSearchInput]    = useState('')
  const [page,           setPage]           = useState(1)
  const [totalPages,     setTotalPages]     = useState(1)
  const [isLoadingMore,  setIsLoadingMore]  = useState(false)
  const [email,          setEmail]          = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      try {
        const params = {
          page: 1,
          limit: 7,
          ...(activeCategory !== 'All' && { category: activeCategory }),
          ...(searchQuery && { search: searchQuery }),
        }
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogs`, { params })
        setPosts(res.data.blogs || [])
        setTotalPages(res.data.totalPages || 1)
        setPage(1)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [activeCategory, searchQuery])

  const handleLoadMore = async () => {
    setIsLoadingMore(true)
    try {
      const nextPage = page + 1
      const params = {
        page: nextPage,
        limit: 6,
        ...(activeCategory !== 'All' && { category: activeCategory }),
        ...(searchQuery && { search: searchQuery }),
      }
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogs`, { params })
      if (res.data.blogs) {
        setPosts(prev => [...prev, ...res.data.blogs])
        setPage(nextPage)
        setTotalPages(res.data.totalPages || 1)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoadingMore(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(searchInput), 500)
    return () => clearTimeout(timer)
  }, [searchInput])

  const featuredPost = posts[0]
  const gridPosts    = posts.slice(1)

  return (
    <div className="bg-background text-on-surface">
      <Navbar />
      
      <header className="relative max-w-7xl mx-auto px-8 pt-28 pb-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-primary/4 rounded-full blur-[150px] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl"
        >
          <p className="font-label text-sm tracking-[0.3em] text-primary uppercase mb-6 flex items-center gap-3">
            <span className="w-12 h-px bg-primary/40" />
            The Celestial Archive
          </p>
          <h1 className="font-headline text-5xl md:text-7xl text-primary leading-tight tracking-tight mb-8">
            Ancient Wisdom for the <br />
            <i className="font-serif opacity-80">Modern Soul</i>
          </h1>
          <p className="text-xl text-on-surface-variant font-light leading-relaxed mb-12">
            Explore the sacred dimensions of existence — from the movement of the stars 
            to the harmony of your home.
          </p>
        </motion.div>
      </header>

      <div className="max-w-7xl mx-auto px-8 pb-12">
        <div className="relative max-w-xl mb-8">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary/40 text-xl pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search articles..."
            className="w-full bg-surface-container border border-primary/15 hover:border-primary/25 focus:border-primary/50
              rounded-full py-3.5 pl-12 pr-5 text-on-surface placeholder:text-on-surface-variant/30
              outline-none transition-all duration-200
              focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)]"
          />
          <AnimatePresence>
            {searchInput && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1   }}
                exit={{   opacity: 0, scale: 0.8  }}
                onClick={() => setSearchInput('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-5 py-2 rounded-full font-label text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? 'gold-gradient text-on-primary shadow-md'
                  : 'border border-primary/15 text-on-surface-variant hover:border-primary/30 hover:text-primary bg-surface-container'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {(searchQuery || activeCategory !== 'All') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{   opacity: 0, height: 0     }}
              className="flex items-center gap-3 mt-5"
            >
              <span className="text-on-surface-variant/50 text-xs font-label">Showing results for:</span>
              {activeCategory !== 'All' && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-label">
                  {activeCategory}
                  <button onClick={() => setActiveCategory('All')}>
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-label">
                  "{searchQuery}"
                  <button onClick={() => setSearchInput('')}>
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <main className="max-w-7xl mx-auto px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8">
            {isLoading && (
              <div className="space-y-8 animate-pulse">
                <div className="rounded-xl bg-surface-container aspect-video mb-6" />
                <div className="h-8 bg-surface-container rounded-full w-3/4 mb-3" />
                <div className="h-4 bg-surface-container rounded-full w-full mb-2" />
                <div className="h-4 bg-surface-container rounded-full w-5/6" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-3">
                      <div className="rounded-xl bg-surface-container aspect-video" />
                      <div className="h-5 bg-surface-container rounded-full w-3/4" />
                      <div className="h-3 bg-surface-container rounded-full w-full" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!isLoading && posts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <span className="material-symbols-outlined text-primary/20 text-7xl mb-6">search_off</span>
                <h3 className="font-headline text-2xl text-primary mb-3">No articles found</h3>
                <p className="text-on-surface-variant font-light mb-8">
                  Try a different search term or category.
                </p>
                <button
                  onClick={() => { setSearchInput(''); setActiveCategory('All') }}
                  className="px-6 py-3 rounded-full border border-primary/20 text-primary font-label text-sm hover:bg-primary/10 transition-colors"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}

            {!isLoading && posts.length > 0 && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory + searchQuery}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{   opacity: 0 }}
                >
                  {featuredPost && (
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group cursor-pointer mb-16"
                    >
                      <Link to={`/blog/${featuredPost.slug}`}>
                        <div className="relative overflow-hidden rounded-xl bg-surface-container-highest mb-6 aspect-video">
                          <img
                            src={featuredPost.featuredImage}
                            alt={featuredPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                          <div className="absolute top-5 left-5">
                            <span className="bg-surface-dim/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-primary/20 text-primary text-xs tracking-widest uppercase font-label">
                              {featuredPost.category}
                            </span>
                          </div>
                          <div className="absolute top-5 right-5">
                            <span className="gold-gradient text-on-primary px-3 py-1.5 rounded-full text-xs font-label tracking-widest uppercase flex items-center gap-1">
                              <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                              Featured
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                          <span className="flex items-center gap-1.5 text-on-surface-variant/50 text-xs font-label">
                            <span className="material-symbols-outlined text-xs">calendar_today</span>
                            {new Date(featuredPost.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-primary/30" />
                          <span className="flex items-center gap-1.5 text-on-surface-variant/50 text-xs font-label">
                            <span className="material-symbols-outlined text-xs">schedule</span>
                            {featuredPost.readTime} min read
                          </span>
                        </div>

                        <h2 className="font-headline text-3xl md:text-4xl text-primary mb-4 group-hover:text-primary/80 transition-colors leading-tight">
                          {featuredPost.title}
                        </h2>
                        <p className="text-on-surface-variant text-lg mb-5 leading-relaxed font-light line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-2 text-primary font-label text-sm tracking-widest uppercase group-hover:gap-3 transition-all">
                          Read Article
                          <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </span>
                      </Link>
                    </motion.article>
                  )}

                  {gridPosts.length > 0 && (
                    <div className="flex items-center gap-4 mb-12">
                      <div className="flex-1 h-px bg-primary/10" />
                      <span className="text-on-surface-variant/30 font-label text-xs tracking-widest uppercase">More Articles</span>
                      <div className="flex-1 h-px bg-primary/10" />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {gridPosts.map((post, i) => (
                      <motion.article
                        key={post._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="group cursor-pointer flex flex-col"
                      >
                        <Link to={`/blog/${post.slug}`} className="flex flex-col flex-1">
                          <div className="relative overflow-hidden rounded-xl bg-surface-container-highest mb-4 aspect-video">
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              loading="lazy"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="bg-surface-dim/80 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/15 text-primary text-xs tracking-widest uppercase font-label">
                                {post.category}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 mb-2">
                            <span className="flex items-center gap-1 text-on-surface-variant/40 text-xs font-label">
                              <span className="material-symbols-outlined text-xs">calendar_today</span>
                              {new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-primary/20" />
                            <span className="flex items-center gap-1 text-on-surface-variant/40 text-xs font-label">
                              <span className="material-symbols-outlined text-xs">schedule</span>
                              {post.readTime} min
                            </span>
                          </div>

                          <h3 className="font-headline text-xl text-primary mb-3 group-hover:text-primary/80 transition-colors leading-snug flex-1">
                            {post.title}
                          </h3>
                          <p className="text-on-surface-variant text-sm leading-relaxed mb-4 line-clamp-2 font-light">
                            {post.excerpt}
                          </p>
                          <span className="inline-flex items-center gap-1.5 text-primary font-label text-xs tracking-widest uppercase group-hover:gap-2.5 transition-all mt-auto">
                            Read
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                          </span>
                        </Link>
                      </motion.article>
                    ))}
                  </div>

                  {page < totalPages && (
                    <div className="text-center mt-16">
                      <motion.button
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        whileHover={!isLoadingMore ? { scale: 1.02 } : {}}
                        whileTap={!isLoadingMore  ? { scale: 0.98 } : {}}
                        className={`px-10 py-4 rounded-full font-label font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300 inline-flex items-center gap-3 ${
                          isLoadingMore
                            ? 'border border-primary/10 text-on-surface-variant/30 cursor-not-allowed'
                            : 'border border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/40'
                        }`}
                      >
                        {isLoadingMore ? (
                          <>
                            <span className="w-4 h-4 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                            Loading...
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-base">expand_more</span>
                            Load More Articles
                          </>
                        )}
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <PopularPostsWidget />
            <CategoriesWidget 
              categories={CATEGORIES.slice(1)} 
              activeCategory={activeCategory} 
              onSelect={setActiveCategory} 
            />
            <NewsletterWidget email={email} setEmail={setEmail} />
            <ConsultationWidget />
          </aside>
        </div>

        {/* Quote Break */}
        <div className="py-32">
          <div className="relative p-12 rounded-xl bg-surface-container-low border border-primary/5 text-center overflow-hidden">
            <span className="material-symbols-outlined text-5xl text-primary/20 mb-6">format_quote</span>
            <blockquote className="font-headline text-3xl md:text-4xl text-primary italic max-w-4xl mx-auto leading-relaxed">
              "The stars within us reflect the stars above us. Knowledge is the bridge that spans the celestial divide."
            </blockquote>
            <cite className="block mt-6 font-label text-sm uppercase tracking-widest text-on-surface-variant/60">— Brihadaranyaka Upanishad</cite>
          </div>
        </div>
      </main>

      <section className="bg-surface border-t border-primary/8 py-20 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="material-symbols-outlined text-primary/30 text-5xl mb-6 block"
            style={{ fontVariationSettings: "'FILL' 1" }}>
            mail
          </span>
          <h2 className="font-headline text-3xl text-primary font-bold mb-4">
            Never Miss a Cosmic Insight
          </h2>
          <p className="text-on-surface-variant font-light mb-8">
            Join our growing community of seekers. Weekly Vedic wisdom delivered to your inbox.
          </p>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              // Reuse logic from NewsletterWidget
            }} 
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-surface-container border border-primary/15 focus:border-primary/40 rounded-full py-3 px-6 text-on-surface outline-none"
            />
            <button className="gold-gradient text-on-primary px-8 py-3 rounded-full font-label font-bold text-xs tracking-widest uppercase hover:scale-105 transition-transform shadow-lg">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default BlogPage

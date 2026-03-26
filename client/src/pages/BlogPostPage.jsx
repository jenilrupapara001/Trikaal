import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios            from 'axios'
import Navbar           from '../components/Navbar'
import Footer           from '../components/Footer'

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

const BlogPostPage = () => {
  const { slug }              = useParams()
  const navigate              = useNavigate()
  const [post,    setPost]    = useState(null)
  const [related, setRelated] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [readProgress, setReadProgress] = useState(0)
  const articleRef            = useRef(null)

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true)
      window.scrollTo(0, 0)
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogs/slug/${slug}`)
        setPost(res.data)
        const relRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/blogs?category=${res.data.category}&limit=3`
        )
        setRelated(relRes.data.blogs.filter(p => p.slug !== slug).slice(0, 3))
      } catch (err) {
        if (err.response?.status === 404) navigate('/blog')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPost()
  }, [slug, navigate])

  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return
      const el    = articleRef.current
      const top   = el.getBoundingClientRect().top
      const height = el.offsetHeight
      const windowH = window.innerHeight
      const scrolled = Math.max(0, -top)
      const total    = height - windowH
      const progress = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0
      setReadProgress(progress)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [post])

  const shareUrl   = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = post?.title || ''

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    // could add a toast here
  }

  return (
    <div className="bg-background text-on-surface">
      <Navbar />

      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-surface-container">
        <motion.div
          className="h-full gold-gradient"
          style={{ width: `${readProgress}%` }}
          transition={{ ease: 'linear', duration: 0.05 }}
        />
      </div>

      {isLoading && (
        <main className="max-w-4xl mx-auto px-8 pt-28 pb-16 animate-pulse">
          <div className="h-4 bg-surface-container rounded-full w-32 mb-8" />
          <div className="h-10 bg-surface-container rounded-full w-3/4 mb-4" />
          <div className="h-10 bg-surface-container rounded-full w-1/2 mb-8" />
          <div className="aspect-video bg-surface-container rounded-xl mb-10" />
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`h-4 bg-surface-container rounded-full ${i % 3 === 2 ? 'w-4/5' : 'w-full'}`} />
            ))}
          </div>
        </main>
      )}

      {!isLoading && post && (
        <article ref={articleRef}>
          <header className="max-w-4xl mx-auto px-8 pt-28 pb-0">
            <nav className="flex items-center gap-2 text-xs font-label text-on-surface-variant/40 mb-8">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-primary line-clamp-1">{post.title}</span>
            </nav>

            <div className="mb-5">
              <Link
                to={`/blog?category=${post.category}`}
                className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-surface-container text-primary font-label text-xs tracking-[0.2em] uppercase hover:bg-primary/10 transition-colors"
              >
                {post.category}
              </Link>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-headline text-4xl md:text-5xl lg:text-6xl text-primary font-bold leading-tight tracking-tight mb-6"
            >
              {post.title}
            </motion.h1>

            <p className="text-xl text-on-surface-variant font-light leading-relaxed mb-8">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-5 pb-8 border-b border-primary/10">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                </div>
                <div>
                  <span className="text-on-surface font-label text-sm font-medium block">{post.author}</span>
                  <span className="text-on-surface-variant/40 text-xs font-label">Author</span>
                </div>
              </div>

              <span className="w-px h-8 bg-primary/10" />

              <div className="flex items-center gap-1.5 text-on-surface-variant/50 text-sm font-label">
                <span className="material-symbols-outlined text-primary/50 text-base">calendar_today</span>
                {new Date(post.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              </div>

              <div className="flex items-center gap-1.5 text-on-surface-variant/50 text-sm font-label">
                <span className="material-symbols-outlined text-primary/50 text-base">schedule</span>
                {post.readTime} min read
              </div>
            </div>

            <div className="flex items-center gap-3 py-5 border-b border-primary/10">
              <span className="text-on-surface-variant/40 font-label text-xs tracking-widest uppercase mr-2">
                Share
              </span>
              {[
                { icon: 'share',    label: 'Copy link',  action: handleCopyLink },
                {
                  icon: 'chat',
                  label: 'WhatsApp',
                  href: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`
                },
              ].map((btn, i) => (
                btn.href ? (
                  <a
                    key={i}
                    href={btn.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-primary/15 text-on-surface-variant hover:border-primary/30 hover:text-primary transition-all text-xs font-label"
                  >
                    <span className="material-symbols-outlined text-sm">{btn.icon}</span>
                    {btn.label}
                  </a>
                ) : (
                  <button
                    key={i}
                    onClick={btn.action}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-primary/15 text-on-surface-variant hover:border-primary/30 hover:text-primary transition-all text-xs font-label"
                  >
                    <span className="material-symbols-outlined text-sm">{btn.icon}</span>
                    {btn.label}
                  </button>
                )
              ))}
            </div>
          </header>

          <div className="max-w-5xl mx-auto px-8 mt-10 mb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1   }}
              className="relative overflow-hidden rounded-2xl aspect-video bg-surface-container"
            >
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </motion.div>
          </div>

          <div className="max-w-7xl mx-auto px-8 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8">
                <div
                  className="
                    prose prose-invert max-w-none
                    prose-headings:font-headline prose-headings:text-primary prose-headings:font-bold
                    prose-p:text-on-surface-variant prose-p:font-light prose-p:leading-relaxed prose-p:text-lg
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-on-surface prose-strong:font-semibold
                    prose-blockquote:border-l-primary prose-blockquote:border-l-2 prose-blockquote:pl-6
                    prose-blockquote:text-on-surface-variant prose-blockquote:italic prose-blockquote:font-headline
                    prose-li:text-on-surface-variant prose-li:font-light
                    prose-hr:border-primary/15
                    prose-img:rounded-xl
                  "
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {post.tags?.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3 mt-12 pt-8 border-t border-primary/10">
                    <span className="material-symbols-outlined text-primary/40 text-base">sell</span>
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-4 py-1.5 rounded-full border border-primary/15 text-on-surface-variant/60 text-xs font-label hover:border-primary/30 hover:text-primary transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 mt-10 pt-8 border-t border-primary/10">
                  <span className="text-on-surface-variant/40 font-label text-xs tracking-widest uppercase mr-2">
                    Found this helpful? Share it
                  </span>
                  {[
                    { icon: 'share', label: 'Copy link', action: handleCopyLink },
                    {
                      icon: 'chat',
                      label: 'WhatsApp',
                      href: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`
                    },
                  ].map((btn, i) => (
                    btn.href ? (
                      <a key={i} href={btn.href} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-primary/15 text-on-surface-variant hover:border-primary/30 hover:text-primary transition-all text-xs font-label">
                        <span className="material-symbols-outlined text-sm">{btn.icon}</span>
                        {btn.label}
                      </a>
                    ) : (
                      <button key={i} onClick={btn.action}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-primary/15 text-on-surface-variant hover:border-primary/30 hover:text-primary transition-all text-xs font-label">
                        <span className="material-symbols-outlined text-sm">{btn.icon}</span>
                        {btn.label}
                      </button>
                    )
                  ))}
                </div>

                <div className="mt-12 p-8 bg-surface-container border border-primary/10 rounded-2xl flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-3xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant/40 font-label text-xs tracking-widest uppercase block mb-1">
                      Written by
                    </span>
                    <h4 className="font-headline text-primary text-xl font-bold mb-2">{post.author}</h4>
                    <p className="text-on-surface-variant text-sm font-light leading-relaxed">
                      Senior Consultant in Jyotish Shastra & Vastu Shastra at Trikaal.
                      Mentored by top Gurus of Jyotish & Vastu, with 3+ years of dedicated practice.
                    </p>
                  </div>
                </div>
              </div>

              <aside className="lg:col-span-4 space-y-8">
                <div className="sticky top-24 space-y-8">
                  <Link
                    to="/blog"
                    className="flex items-center gap-2 text-on-surface-variant/50 hover:text-primary transition-colors text-sm font-label group"
                  >
                    <span className="material-symbols-outlined text-base group-hover:-translate-x-1 transition-transform">
                      arrow_back
                    </span>
                    Back to Blog
                  </Link>
                  <ConsultationWidget />
                  <div className="bg-surface-container border border-primary/10 rounded-xl p-5">
                    <p className="text-on-surface-variant/50 font-label text-xs tracking-widest uppercase mb-3">
                      Category
                    </p>
                    <Link
                      to={`/blog?category=${post.category}`}
                      className="flex items-center justify-between text-primary font-label text-sm hover:gap-3 transition-all group"
                    >
                      <span>{post.category}</span>
                      <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>

          {related.length > 0 && (
            <section className="bg-surface border-t border-primary/8 py-20 px-8">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <span className="text-primary font-label text-xs tracking-[0.3em] uppercase block mb-2">
                      Continue Reading
                    </span>
                    <h2 className="font-headline text-3xl text-primary font-bold">Related Articles</h2>
                  </div>
                  <Link
                    to="/blog"
                    className="hidden md:flex items-center gap-2 text-on-surface-variant/50 hover:text-primary transition-colors font-label text-sm"
                  >
                    View All
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {related.map((rPost, i) => (
                    <motion.article
                      key={rPost._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group cursor-pointer"
                    >
                      <Link to={`/blog/${rPost.slug}`}>
                        <div className="relative overflow-hidden rounded-xl bg-surface-container-highest mb-4 aspect-video">
                          <img
                            src={rPost.featuredImage}
                            alt={rPost.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="bg-surface-dim/80 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/15 text-primary text-xs font-label tracking-widest uppercase">
                              {rPost.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2 text-on-surface-variant/40 text-xs font-label">
                          <span className="material-symbols-outlined text-xs">schedule</span>
                          {rPost.readTime} min read
                        </div>
                        <h3 className="font-headline text-lg text-primary font-bold group-hover:text-primary/80 transition-colors leading-snug">
                          {rPost.title}
                        </h3>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>
          )}
        </article>
      )}

      <Footer />
    </div>
  )
}

export default BlogPostPage

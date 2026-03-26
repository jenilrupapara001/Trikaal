import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useToast } from '../../context/ToastContext'
import { motion, AnimatePresence } from 'framer-motion'
import AdminLayout from '../../components/admin/AdminLayout'

// ─── Category options ──────────────────────────────────────
const CATEGORIES = ['Astrology', 'Vastu', 'Jyotish', 'Numerology', 'Remedies', 'Philosophy', 'Festivals']

// ─── Slug generator ────────────────────────────────────────
const generateSlug = (title) =>
    title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')

// ─── Read time estimator (avg 200 words/min) ─────────────
const estimateReadTime = (content) => {
    const words = content.trim().split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.ceil(words / 200))
}

// ─── Empty form state ────────────────────────────────────
const EMPTY_FORM = {
    title: '',
    slug: '',
    category: 'Astrology',
    excerpt: '',
    content: '',
    featuredImage: '',
    readTime: 5,
    tags: '',
    status: 'draft',
    metaTitle: '',
    metaDescription: '',
}

// ─── Main Component ──────────────────────────────────────
const BlogManager = () => {

    const toast = useToast()

    // ─── State ──────────────────────────────────────────────
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingBlog, setEditingBlog] = useState(null)
    const [formData, setFormData] = useState(EMPTY_FORM)
    const [activeTab, setActiveTab] = useState('content')
    const [slugManual, setSlugManual] = useState(false)
    const [imageUploading, setImageUploading] = useState(false)
    const [deleteTarget, setDeleteTarget] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [filterCategory, setFilterCategory] = useState('all')
    const [isSaving, setIsSaving] = useState(false)

    // ─── Auth header ────────────────────────────────────────
    const getAuthHeaders = () => ({
        headers: { 'x-auth-token': localStorage.getItem('token') }
    })

    // ─── Fetch blogs ────────────────────────────────────────
    const fetchBlogs = useCallback(async () => {
        setLoading(true)
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/blogs?limit=100`,
                getAuthHeaders()
            )
            setBlogs(res.data.blogs || [])
        } catch (err) {
            toast.error('Could not load blog posts.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }, [toast])

    useEffect(() => { fetchBlogs() }, [fetchBlogs])

    // ─── Filtered blogs ─────────────────────────────────────
    const filteredBlogs = blogs.filter(b => {
        const matchesSearch = searchQuery === '' ||
            b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.category.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = filterStatus === 'all' || b.status === filterStatus
        const matchesCategory = filterCategory === 'all' || b.category === filterCategory
        return matchesSearch && matchesStatus && matchesCategory
    })

    // ─── Open modal (create) ─────────────────────────────────
    const handleCreate = () => {
        setEditingBlog(null)
        setFormData(EMPTY_FORM)
        setSlugManual(false)
        setActiveTab('content')
        setIsModalOpen(true)
    }

    // ─── Open modal (edit) ──────────────────────────────────
    const handleEdit = (blog) => {
        setEditingBlog(blog)
        setFormData({
            title: blog.title || '',
            slug: blog.slug || '',
            category: blog.category || 'Astrology',
            excerpt: blog.excerpt || '',
            content: blog.content || '',
            featuredImage: blog.featuredImage || '',
            readTime: blog.readTime || 5,
            tags: blog.tags ? blog.tags.join(', ') : '',
            status: blog.status || 'draft',
            metaTitle: blog.metaTitle || '',
            metaDescription: blog.metaDescription || '',
        })
        setSlugManual(true)
        setActiveTab('content')
        setIsModalOpen(true)
    }

    // ─── Auto-generate slug from title ──────────────────────
    const handleTitleChange = (value) => {
        setFormData(prev => ({
            ...prev,
            title: value,
            slug: slugManual ? prev.slug : generateSlug(value),
        }))
    }

    // ─── Auto-estimate read time from content ───────────────
    const handleContentChange = (text) => {
        setFormData(prev => ({
            ...prev,
            content: text,
            readTime: estimateReadTime(text),
        }))
    }

    // ─── Image upload to Cloudinary ─────────────────────────
    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file.')
            return
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image must be smaller than 5MB.')
            return
        }

        setImageUploading(true)
        try {
            const form = new FormData()
            form.append('image', file)
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/upload`,
                form,
                { ...getAuthHeaders(), headers: { ...getAuthHeaders().headers, 'Content-Type': 'multipart/form-data' } }
            )
            setFormData(prev => ({ ...prev, featuredImage: res.data.url }))
            toast.success('Image uploaded successfully!')
        } catch (err) {
            toast.error('Image upload failed. Please try again.')
            console.error(err)
        } finally {
            setImageUploading(false)
        }
    }

    // ─── Submit (create or update) ──────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.title.trim()) { toast.error('Title is required.'); return }
        if (!formData.excerpt.trim()) { toast.error('Excerpt is required.'); return }
        if (!formData.content.trim()) { toast.error('Content cannot be empty.'); return }
        if (!formData.featuredImage.trim()) { toast.error('Featured image is required.'); return }

        setIsSaving(true)
        const payload = {
            ...formData,
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
            readTime: estimateReadTime(formData.content),
        }

        try {
            const isEdit = !!editingBlog
            const url = isEdit
                ? `${import.meta.env.VITE_API_BASE_URL}/blogs/${editingBlog._id}`
                : `${import.meta.env.VITE_API_BASE_URL}/blogs`
            const method = isEdit ? 'put' : 'post'

            const res = await axios[method](url, payload, getAuthHeaders())

            if (isEdit) {
                setBlogs(prev => prev.map(b => b._id === res.data._id ? res.data : b))
                toast.success('Blog post updated successfully!')
            } else {
                setBlogs(prev => [res.data, ...prev])
                toast.success('Blog post published!')
            }

            setIsModalOpen(false)
            setEditingBlog(null)
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Could not save blog post.')
            console.error(err)
        } finally {
            setIsSaving(false)
        }
    }

    // ─── Toggle status published ↔ draft ─────────────────────
    const handleToggleStatus = async (blog) => {
        const newStatus = blog.status === 'published' ? 'draft' : 'published'
        try {
            await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/blogs/${blog._id}`,
                { status: newStatus },
                getAuthHeaders()
            )
            setBlogs(prev => prev.map(b => b._id === blog._id ? { ...b, status: newStatus } : b))
            toast.success(`Post ${newStatus === 'published' ? 'published' : 'moved to draft'}.`)
        } catch (err) {
            toast.error('Could not update status.')
        }
    }

    // ─── Delete flow ─────────────────────────────────────────
    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return
        try {
            await axios.delete(
                `${import.meta.env.VITE_API_BASE_URL}/blogs/${deleteTarget._id}`,
                getAuthHeaders()
            )
            setBlogs(prev => prev.filter(b => b._id !== deleteTarget._id))
            toast.success('Blog post deleted.')
        } catch (err) {
            toast.error('Could not delete post.')
        } finally {
            setDeleteTarget(null)
        }
    }

    // ─── Render ─────────────────────────────────────────────
    return (
        <AdminLayout title="Blog Content Manager">

            {/* ── Page header ────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Blog Posts</h2>
                    <p className="text-on-surface-variant text-sm mt-1">
                        {blogs.length} total · {blogs.filter(b => b.status === 'published').length} published · {blogs.filter(b => b.status === 'draft').length} drafts
                    </p>
                </div>
                <button
                    onClick={handleCreate}
                    className="gold-gradient text-on-primary px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg flex items-center gap-2 hover:scale-105 transition-all self-start sm:self-auto"
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                    New Post
                </button>
            </div>

            {/* ── Search + Filter toolbar ─────────────────────── */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">

                {/* Search */}
                <div className="relative flex-1">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary/40 text-lg pointer-events-none">
                        search
                    </span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search posts..."
                        className="w-full bg-surface-container border border-primary/15 hover:border-primary/25 focus:border-primary/50 rounded-xl py-2.5 pl-10 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant/30 outline-none transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-primary transition-colors"
                        >
                            <span className="material-symbols-outlined text-base">close</span>
                        </button>
                    )}
                </div>

                {/* Status filter */}
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-surface-container border border-primary/15 rounded-xl px-4 py-2.5 text-sm text-on-surface-variant outline-none cursor-pointer hover:border-primary/30 transition-all min-w-[130px]"
                >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </select>

                {/* Category filter */}
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="bg-surface-container border border-primary/15 rounded-xl px-4 py-2.5 text-sm text-on-surface-variant outline-none cursor-pointer hover:border-primary/30 transition-all min-w-[140px]"
                >
                    <option value="all">All Categories</option>
                    {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                </select>

            </div>

            {/* ── Table ───────────────────────────────────────── */}
            {loading ? (

                /* Loading skeleton */
                <div className="bg-surface-container-high rounded-2xl border border-primary/10 overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 px-8 py-5 border-b border-primary/5 animate-pulse">
                            <div className="w-12 h-12 rounded-lg bg-surface-container flex-shrink-0" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-surface-container rounded-full w-1/2" />
                                <div className="h-3 bg-surface-container rounded-full w-3/4" />
                            </div>
                            <div className="w-20 h-6 bg-surface-container rounded-full" />
                            <div className="w-16 h-6 bg-surface-container rounded-full" />
                        </div>
                    ))}
                </div>

            ) : filteredBlogs.length === 0 ? (

                /* Empty state */
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-24 text-center bg-surface-container-high rounded-2xl border border-primary/10"
                >
                    <span className="material-symbols-outlined text-primary/20 text-7xl mb-4">article</span>
                    <h3 className="font-headline text-xl text-primary mb-2">
                        {searchQuery || filterStatus !== 'all' || filterCategory !== 'all'
                            ? 'No posts match your filters'
                            : 'No blog posts yet'
                        }
                    </h3>
                    <p className="text-on-surface-variant text-sm mb-6 font-light">
                        {searchQuery || filterStatus !== 'all' || filterCategory !== 'all'
                            ? 'Try adjusting your search or filters.'
                            : 'Create your first blog post to get started.'
                        }
                    </p>
                    {!(searchQuery || filterStatus !== 'all' || filterCategory !== 'all') && (
                        <button
                            onClick={handleCreate}
                            className="gold-gradient text-on-primary px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-sm">add</span>
                            Create First Post
                        </button>
                    )}
                </motion.div>

            ) : (

                /* Data table */
                <div className="bg-surface-container-high rounded-2xl border border-primary/10 overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[700px]">
                            <thead>
                                <tr className="bg-background/50 border-b border-primary/10 text-on-surface-variant text-[10px] uppercase tracking-widest font-bold">
                                    <th className="px-6 py-4">Post</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Stats</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-primary/5">
                                {filteredBlogs.map((blog) => (
                                    <motion.tr
                                        key={blog._id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="hover:bg-primary/3 transition-all group"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container border border-primary/10">
                                                    {blog.featuredImage ? (
                                                        <img src={blog.featuredImage} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-primary/20 text-xl">image</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-on-surface font-bold text-sm truncate max-w-[220px]">
                                                        {blog.title}
                                                    </p>
                                                    <p className="text-on-surface-variant text-xs truncate max-w-[220px] mt-0.5 font-light">
                                                        /{blog.slug}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="px-3 py-1 rounded-full bg-surface-container text-primary text-[10px] font-bold uppercase tracking-wider">
                                                {blog.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4 text-on-surface-variant">
                                                <div className="flex items-center gap-1" title="Views">
                                                    <span className="material-symbols-outlined text-[14px]">visibility</span>
                                                    <span className="text-xs">{blog.views || 0}</span>
                                                </div>
                                                <div className="flex items-center gap-1" title="Read time">
                                                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                                                    <span className="text-xs">{blog.readTime}m</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <button
                                                onClick={() => handleToggleStatus(blog)}
                                                title={`Click to ${blog.status === 'published' ? 'move to draft' : 'publish'}`}
                                                className={`flex items-center gap-1.5 text-[10px] font-bold uppercase transition-all hover:opacity-70 ${blog.status === 'published' ? 'text-green-400' : 'text-on-surface-variant/50'
                                                    }`}
                                            >
                                                <span className={`w-1.5 h-1.5 rounded-full ${blog.status === 'published' ? 'bg-green-400 animate-pulse' : 'bg-on-surface-variant/30'
                                                    }`} />
                                                {blog.status === 'published' ? 'Live' : 'Draft'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <a
                                                    href={`/blog/${blog.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-lg bg-surface-container hover:bg-primary/15 hover:text-primary transition-all"
                                                    title="Preview post"
                                                >
                                                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                                                </a>
                                                <button
                                                    onClick={() => handleEdit(blog)}
                                                    className="p-2 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary transition-all"
                                                    title="Edit post"
                                                >
                                                    <span className="material-symbols-outlined text-sm">edit</span>
                                                </button>
                                                <button
                                                    onClick={() => setDeleteTarget(blog)}
                                                    className="p-2 rounded-lg bg-surface-container hover:bg-red-900/40 hover:text-red-400 transition-all"
                                                    title="Delete post"
                                                >
                                                    <span className="material-symbols-outlined text-sm">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ── Delete confirmation modal ───────────────────── */}
            <AnimatePresence>
                {deleteTarget && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setDeleteTarget(null)}
                            className="absolute inset-0 bg-background/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative bg-surface-container-high rounded-2xl border border-red-500/20 p-8 max-w-sm w-full shadow-2xl text-center"
                        >
                            <div className="w-14 h-14 rounded-full bg-red-900/20 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
                                <span className="material-symbols-outlined text-red-400 text-3xl">delete_forever</span>
                            </div>
                            <h3 className="font-headline text-xl text-on-surface font-bold mb-2">Delete Post?</h3>
                            <p className="text-on-surface-variant text-sm font-light mb-2">
                                You're about to permanently delete:
                            </p>
                            <p className="text-primary font-label text-sm font-bold mb-6 px-4 truncate">
                                "{deleteTarget.title}"
                            </p>
                            <p className="text-on-surface-variant/50 text-xs mb-8">
                                This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteTarget(null)}
                                    className="flex-1 py-3 rounded-xl border border-primary/20 text-on-surface hover:bg-background/50 transition-all font-bold text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteConfirm}
                                    className="flex-1 py-3 rounded-xl bg-red-900/40 border border-red-500/30 text-red-300 hover:bg-red-900/60 transition-all font-bold text-sm flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-sm">delete</span>
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ── Editor modal ────────────────────────────────── */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8 pt-8 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 bg-background/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-4xl bg-surface-container rounded-3xl border border-primary/20 shadow-2xl overflow-hidden my-auto"
                        >
                            {/* Modal header */}
                            <div className="px-8 py-5 border-b border-primary/10 flex items-center justify-between bg-surface-container-high/60 sticky top-0 z-10">
                                <div>
                                    <h3 className="text-lg font-headline font-bold text-primary">
                                        {editingBlog ? 'Edit Post' : 'New Blog Post'}
                                    </h3>
                                    {formData.slug && (
                                        <p className="text-on-surface-variant/40 text-xs font-label mt-0.5">
                                            /blog/{formData.slug}
                                        </p>
                                    )}
                                </div>

                                {/* Tab switcher */}
                                <div className="flex items-center gap-1 bg-background/40 rounded-xl p-1 border border-primary/10">
                                    {[
                                        { key: 'content', icon: 'edit', label: 'Content' },
                                        { key: 'seo', icon: 'travel_explore', label: 'SEO' },
                                        { key: 'preview', icon: 'visibility', label: 'Preview' },
                                    ].map((tab) => (
                                        <button
                                            key={tab.key}
                                            type="button"
                                            onClick={() => setActiveTab(tab.key)}
                                            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-label font-bold uppercase tracking-wide transition-all ${activeTab === tab.key
                                                    ? 'bg-primary text-on-primary shadow-md'
                                                    : 'text-on-surface-variant hover:text-primary'
                                                }`}
                                        >
                                            <span className="material-symbols-outlined text-sm">{tab.icon}</span>
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 rounded-full hover:bg-background/50 transition-colors text-on-surface-variant hover:text-primary"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            {/* Modal body */}
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="p-8 min-h-[500px]">

                                    {/* ── TAB 1: CONTENT ─────────────────────── */}
                                    {activeTab === 'content' && (
                                        <div className="space-y-6">

                                            {/* Title */}
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">
                                                    Title *
                                                </label>
                                                <input
                                                    value={formData.title}
                                                    onChange={(e) => handleTitleChange(e.target.value)}
                                                    placeholder="The Secrets of Saturn's Return..."
                                                    className="w-full bg-background/50 border border-primary/20 focus:border-primary/50 rounded-xl px-5 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/30 outline-none transition-all focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)]"
                                                />
                                            </div>

                                            {/* Slug */}
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2 flex items-center gap-2">
                                                    URL Slug *
                                                    <span className="text-on-surface-variant/40 normal-case tracking-normal font-normal">
                                                        (auto-generated from title)
                                                    </span>
                                                </label>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-on-surface-variant/30 text-sm font-label flex-shrink-0">/blog/</span>
                                                    <input
                                                        value={formData.slug}
                                                        onChange={(e) => {
                                                            setSlugManual(true)
                                                            setFormData(prev => ({ ...prev, slug: e.target.value }))
                                                        }}
                                                        placeholder="auto-generated-from-title"
                                                        className="flex-1 bg-background/50 border border-primary/20 focus:border-primary/50 rounded-xl px-5 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/30 outline-none transition-all font-label"
                                                    />
                                                    {slugManual && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSlugManual(false)
                                                                setFormData(prev => ({ ...prev, slug: generateSlug(prev.title) }))
                                                            }}
                                                            className="flex-shrink-0 p-2.5 rounded-xl border border-primary/20 text-on-surface-variant hover:text-primary hover:border-primary/40 transition-all"
                                                            title="Reset to auto-generated"
                                                        >
                                                            <span className="material-symbols-outlined text-sm">refresh</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Category + Status row */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">
                                                        Category
                                                    </label>
                                                    <select
                                                        value={formData.category}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                                        className="w-full bg-background/50 border border-primary/20 rounded-xl px-5 py-3 text-sm text-on-surface outline-none appearance-none cursor-pointer focus:border-primary/50 transition-all"
                                                    >
                                                        {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">
                                                        Status
                                                    </label>
                                                    <div className="flex gap-2">
                                                        {['draft', 'published'].map((s) => (
                                                            <button
                                                                key={s}
                                                                type="button"
                                                                onClick={() => setFormData(prev => ({ ...prev, status: s }))}
                                                                className={`flex-1 py-3 px-4 rounded-xl text-xs font-label font-bold uppercase tracking-wide transition-all border ${formData.status === s
                                                                        ? s === 'published'
                                                                            ? 'bg-green-900/30 border-green-500/30 text-green-400'
                                                                            : 'bg-primary/10 border-primary/30 text-primary'
                                                                        : 'border-primary/15 text-on-surface-variant hover:border-primary/25'
                                                                    }`}
                                                            >
                                                                {s === 'published' ? (
                                                                    <span className="flex items-center justify-center gap-1">
                                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                                                        Live
                                                                    </span>
                                                                ) : (
                                                                    <span className="flex items-center justify-center gap-1">
                                                                        <span className="material-symbols-outlined text-xs">edit_document</span>
                                                                        Draft
                                                                    </span>
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Featured image */}
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">
                                                    Featured Image *
                                                </label>
                                                <div className="flex gap-3">
                                                    <input
                                                        value={formData.featuredImage}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                                                        placeholder="https://... or upload below"
                                                        className="flex-1 bg-background/50 border border-primary/20 focus:border-primary/50 rounded-xl px-5 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/30 outline-none transition-all"
                                                    />
                                                    <label className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl border border-primary/20 text-on-surface-variant hover:border-primary/40 hover:text-primary transition-all cursor-pointer text-xs font-label font-bold uppercase ${imageUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                                        {imageUploading ? (
                                                            <span className="w-4 h-4 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                                                        ) : (
                                                            <span className="material-symbols-outlined text-sm">upload</span>
                                                        )}
                                                        {imageUploading ? 'Uploading...' : 'Upload'}
                                                        <input type="file" accept="image/*" className="hidden" disabled={imageUploading} onChange={handleImageUpload} />
                                                    </label>
                                                </div>
                                                {formData.featuredImage && (
                                                    <div className="mt-3 relative w-full aspect-video rounded-xl overflow-hidden border border-primary/10 bg-surface-container">
                                                        <img src={formData.featuredImage} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none' }} />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Excerpt */}
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">
                                                    Excerpt * <span className="normal-case font-normal text-on-surface-variant/40 tracking-normal">(shown on blog listing)</span>
                                                </label>
                                                <textarea
                                                    rows={2}
                                                    value={formData.excerpt}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                                                    maxLength={200}
                                                    placeholder="A brief, compelling summary of this article..."
                                                    className="w-full bg-background/50 border border-primary/20 focus:border-primary/50 rounded-xl px-5 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/30 outline-none resize-none transition-all"
                                                />
                                                <p className="text-on-surface-variant/30 text-xs mt-1 text-right">
                                                    {formData.excerpt.length}/200
                                                </p>
                                            </div>

                                            {/* Content — Textarea with formatting help */}
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="text-[10px] uppercase tracking-widest font-bold text-primary">
                                                        Content *
                                                    </label>
                                                    <span className="text-on-surface-variant/30 text-xs font-label">
                                                        ~{estimateReadTime(formData.content)} min read
                                                    </span>
                                                </div>

                                                <textarea
                                                    value={formData.content}
                                                    onChange={(e) => handleContentChange(e.target.value)}
                                                    rows={12}
                                                    placeholder={`Write your blog content here...\n\nYou can use basic formatting:\n• Use line breaks for paragraphs\n• Use **bold** for emphasis\n• Use ## for headings\n• Use bullet points for lists`}
                                                    className="w-full bg-background/50 border border-primary/20 focus:border-primary/50 rounded-xl px-5 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/30 outline-none transition-all font-mono leading-relaxed min-h-[280px]"
                                                />

                                                <div className="mt-3 flex flex-wrap gap-2 text-xs text-on-surface-variant/50">
                                                    <span className="flex items-center gap-1">
                                                        <span className="font-mono text-[10px]">**text**</span> = bold
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <span className="font-mono text-[10px]">## Heading</span>
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <span className="font-mono text-[10px]">• item</span> = bullet
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Tags + Read time row */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">
                                                        Tags <span className="normal-case font-normal text-on-surface-variant/40 tracking-normal">(comma separated)</span>
                                                    </label>
                                                    <input
                                                        value={formData.tags}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                                                        placeholder="Saturn, Karma, Vedic"
                                                        className="w-full bg-background/50 border border-primary/20 focus:border-primary/50 rounded-xl px-5 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/30 outline-none transition-all"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">
                                                        Read Time (min) <span className="normal-case font-normal text-on-surface-variant/40 tracking-normal">(auto-calculated)</span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={formData.readTime}
                                                        readOnly
                                                        className="w-full bg-background/30 border border-primary/10 rounded-xl px-5 py-3 text-sm text-on-surface-variant/50 outline-none cursor-not-allowed"
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    )}

                                    {/* ── TAB 2: SEO ──────────────────────────── */}
                                    {activeTab === 'seo' && (
                                        <div className="space-y-6">

                                            <div className="p-4 bg-primary/5 border border-primary/15 rounded-xl flex items-start gap-3">
                                                <span className="material-symbols-outlined text-primary text-xl flex-shrink-0">info</span>
                                                <p className="text-on-surface-variant text-sm font-light leading-relaxed">
                                                    SEO fields help search engines understand and rank your content.
                                                    If left blank, the post title and excerpt will be used as defaults.
                                                </p>
                                            </div>

                                            {/* Meta Title */}
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">
                                                    Meta Title
                                                </label>
                                                <input
                                                    value={formData.metaTitle}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                                                    maxLength={60}
                                                    placeholder={formData.title || 'SEO title (60 chars max)'}
                                                    className="w-full bg-background/50 border border-primary/20 focus:border-primary/50 rounded-xl px-5 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/30 outline-none transition-all"
                                                />
                                                <div className="flex justify-between mt-1">
                                                    <p className="text-on-surface-variant/30 text-xs">Ideal: 50–60 characters</p>
                                                    <p className={`text-xs ${formData.metaTitle.length > 60 ? 'text-red-400' : 'text-on-surface-variant/30'}`}>
                                                        {formData.metaTitle.length}/60
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Meta Description */}
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">
                                                    Meta Description
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    value={formData.metaDescription}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                                                    maxLength={160}
                                                    placeholder={formData.excerpt || 'SEO description (160 chars max)'}
                                                    className="w-full bg-background/50 border border-primary/20 focus:border-primary/50 rounded-xl px-5 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/30 outline-none resize-none transition-all"
                                                />
                                                <div className="flex justify-between mt-1">
                                                    <p className="text-on-surface-variant/30 text-xs">Ideal: 120–160 characters</p>
                                                    <p className={`text-xs ${formData.metaDescription.length > 160 ? 'text-red-400' : 'text-on-surface-variant/30'}`}>
                                                        {formData.metaDescription.length}/160
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Google SERP Preview */}
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-3">
                                                    Search Result Preview
                                                </label>
                                                <div className="p-5 bg-background/30 border border-primary/10 rounded-xl">
                                                    <p className="text-blue-400 text-base font-medium truncate">
                                                        {formData.metaTitle || formData.title || 'Your post title will appear here'}
                                                    </p>
                                                    <p className="text-green-600 text-xs mt-0.5 font-label">
                                                        trikaal.com/blog/{formData.slug || 'post-slug'}
                                                    </p>
                                                    <p className="text-on-surface-variant/60 text-sm mt-1 line-clamp-2 font-light">
                                                        {formData.metaDescription || formData.excerpt || 'Your meta description will appear here in search results...'}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    )}

                                    {/* ── TAB 3: PREVIEW ──────────────────────── */}
                                    {activeTab === 'preview' && (
                                        <div>
                                            {formData.content ? (
                                                <div className="space-y-6">
                                                    {formData.featuredImage && (
                                                        <div className="aspect-video rounded-xl overflow-hidden">
                                                            <img src={formData.featuredImage} alt="" className="w-full h-full object-cover" />
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-3">
                                                        {formData.category && (
                                                            <span className="px-3 py-1 rounded-full border border-primary/20 text-primary text-xs font-label uppercase tracking-widest">
                                                                {formData.category}
                                                            </span>
                                                        )}
                                                        <span className="text-on-surface-variant/40 text-xs font-label">
                                                            ~{estimateReadTime(formData.content)} min read
                                                        </span>
                                                    </div>
                                                    {formData.title && (
                                                        <h1 className="font-headline text-3xl text-primary font-bold leading-tight">
                                                            {formData.title}
                                                        </h1>
                                                    )}
                                                    {formData.excerpt && (
                                                        <p className="text-on-surface-variant text-lg font-light leading-relaxed border-l-2 border-primary/30 pl-4 italic">
                                                            {formData.excerpt}
                                                        </p>
                                                    )}
                                                    <div className="prose prose-invert max-w-none">
                                                        <div className="text-on-surface-variant font-light leading-relaxed whitespace-pre-wrap">
                                                            {formData.content}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                                    <span className="material-symbols-outlined text-primary/20 text-6xl mb-4">preview</span>
                                                    <p className="text-on-surface-variant/50 text-sm">
                                                        Switch to the Content tab and add some content to see a preview.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                </div>

                                {/* Modal footer */}
                                <div className="sticky bottom-0 px-8 py-5 border-t border-primary/10 bg-surface-container/95 backdrop-blur-sm flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-3 rounded-xl border border-primary/20 text-on-surface hover:bg-background/50 transition-all font-bold text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <motion.button
                                        type="submit"
                                        disabled={isSaving}
                                        whileHover={!isSaving ? { scale: 1.02 } : {}}
                                        whileTap={!isSaving ? { scale: 0.98 } : {}}
                                        className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${isSaving
                                                ? 'bg-primary/20 text-on-primary/40 cursor-not-allowed'
                                                : 'gold-gradient text-on-primary shadow-xl shadow-primary/20 hover:shadow-primary/30'
                                            }`}
                                    >
                                        {isSaving ? (
                                            <>
                                                <span className="w-4 h-4 rounded-full border-2 border-on-primary/20 border-t-on-primary animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <span className="material-symbols-outlined text-sm">
                                                    {editingBlog ? 'save' : 'publish'}
                                                </span>
                                                {editingBlog
                                                    ? 'Save Changes'
                                                    : formData.status === 'published' ? 'Publish Post' : 'Save as Draft'
                                                }
                                            </>
                                        )}
                                    </motion.button>
                                </div>

                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </AdminLayout>
    )
}

export default BlogManager

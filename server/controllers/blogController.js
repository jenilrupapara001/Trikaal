import Blog from '../models/Blog.js';
import slugify from '../utils/slugify.js';

// @desc    Get all blogs (public)
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const query = { status: 'published' };

        if (req.query.category) {
            query.category = req.query.category;
        }

        if (req.query.search) {
            query.$or = [
                { title: { $regex: req.query.search, $options: 'i' } },
                { content: { $regex: req.query.search, $options: 'i' } },
            ];
        }

        const blogs = await Blog.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Blog.countDocuments(query);

        res.json({
            success: true,
            blogs,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single blog
// @route   GET /api/blogs/:slug
// @access  Public
export const getBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug, status: 'published' });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found',
            });
        }

        res.json({
            success: true,
            blog,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create blog (admin)
// @route   POST /api/blogs
// @access  Private/Admin
export const createBlog = async (req, res, next) => {
    try {
        const { title, content, excerpt, category, author, tags, status, metaTitle, metaDescription, ogImage } = req.body;

        let slug = slugify(title);

        // Check if slug exists
        const existingBlog = await Blog.findOne({ slug });
        if (existingBlog) {
            slug = `${slug}-${Date.now()}`;
        }

        // Calculate read time (approximate)
        const words = content.split(/\s+/).length;
        const readTime = Math.ceil(words / 200);

        const blog = await Blog.create({
            title,
            slug,
            content,
            excerpt: excerpt || content.substring(0, 150) + '...',
            category,
            author: author || 'Cosmic Guru',
            tags: tags || [],
            status: status || 'draft',
            metaTitle: metaTitle || title,
            metaDescription: metaDescription || excerpt,
            ogImage,
            readTime,
        });

        res.status(201).json({
            success: true,
            blog,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update blog (admin)
// @route   PUT /api/blogs/:id
// @access  Private/Admin
export const updateBlog = async (req, res, next) => {
    try {
        const { title, content, excerpt, category, author, tags, status, metaTitle, metaDescription, ogImage } = req.body;

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found',
            });
        }

        // Update slug if title changed
        let slug = blog.slug;
        if (title && title !== blog.title) {
            slug = slugify(title);
            const existingBlog = await Blog.findOne({ slug, _id: { $ne: blog._id } });
            if (existingBlog) {
                slug = `${slug}-${Date.now()}`;
            }
        }

        // Calculate read time
        const contentToUse = content || blog.content;
        const words = contentToUse.split(/\s+/).length;
        const readTime = Math.ceil(words / 200);

        blog.title = title || blog.title;
        blog.slug = slug;
        blog.content = content || blog.content;
        blog.excerpt = excerpt || blog.excerpt;
        blog.category = category || blog.category;
        blog.author = author || blog.author;
        blog.tags = tags || blog.tags;
        blog.status = status || blog.status;
        blog.metaTitle = metaTitle || blog.metaTitle;
        blog.metaDescription = metaDescription || blog.metaDescription;
        blog.ogImage = ogImage || blog.ogImage;
        blog.readTime = readTime;

        await blog.save();

        res.json({
            success: true,
            blog,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete blog (admin)
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
export const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found',
            });
        }

        await blog.deleteOne();

        res.json({
            success: true,
            message: 'Blog deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all blogs for admin
// @route   GET /api/blogs/admin/all
// @access  Private/Admin
export const getAllBlogsAdmin = async (req, res, next) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            blogs,
        });
    } catch (error) {
        next(error);
    }
};

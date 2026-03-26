const Blog = require('../models/Blog');

// Utility for slug generation
const generateSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

exports.createBlog = async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
        const { title, slug, content, category, featuredImage, excerpt, tags, readTime, author, status, metaTitle, metaDescription } = req.body;

        // Use provided slug or generate from title
        const finalSlug = slug || generateSlug(title);

        const blog = new Blog({
            title,
            slug: finalSlug,
            content,
            category,
            featuredImage,
            excerpt,
            tags,
            readTime,
            author: author || 'Acharya Varma',
            status: status || 'draft',
            metaTitle,
            metaDescription
        });

        await blog.save();
        res.status(201).json(blog);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const { page = 1, limit = 7, category, search, sort, status } = req.query;

        const query = {};
        if (category && category !== 'All') query.category = category;
        if (status && status !== 'all') query.status = status;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
                { excerpt: { $regex: search, $options: 'i' } }
            ];
        }

        const sortOptions = {};
        if (sort === 'views') {
            sortOptions.views = -1;
        } else {
            sortOptions.createdAt = -1;
        }

        const blogs = await Blog.find(query)
            .sort(sortOptions)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Blog.countDocuments(query);

        res.json({
            blogs,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        blog.views += 1;
        await blog.save();

        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

        const { title, slug, content, category, featuredImage, excerpt, tags, readTime, author, status, metaTitle, metaDescription } = req.body;
        const updates = {
            title,
            content,
            category,
            featuredImage,
            excerpt,
            tags,
            readTime,
            author,
            status,
            metaTitle,
            metaDescription,
            updatedAt: Date.now()
        };

        // Use provided slug or generate from title
        if (slug) {
            updates.slug = slug;
        } else if (title) {
            updates.slug = generateSlug(title);
        }

        const blog = await Blog.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        res.json(blog);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: 'Blog deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

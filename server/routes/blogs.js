const express = require('express');
const router = express.Router();
const { createBlog, getAllBlogs, getBlogById, getBlogBySlug, updateBlog, deleteBlog } = require('../controllers/blogController');
const auth = require('../middleware/auth');

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.get('/slug/:slug', getBlogBySlug);
router.post('/', auth, createBlog);
router.put('/:id', auth, updateBlog);
router.delete('/:id', auth, deleteBlog);

module.exports = router;

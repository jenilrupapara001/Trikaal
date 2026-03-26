import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from '../services/api';

const ManageBlogs = () => {
    const queryClient = useQueryClient();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        category: 'vedic',
        status: 'draft',
    });

    const { data: blogs, isLoading } = useQuery({
        queryKey: ['admin-blogs'],
        queryFn: async () => {
            const response = await api.get('/blogs/admin/all');
            return response.data.blogs;
        },
    });

    const createBlog = useMutation({
        mutationFn: async (data) => {
            const response = await api.post('/blogs', data);
            return response.data;
        },
        onSuccess: () => {
            toast.success('Blog created successfully!');
            queryClient.invalidateQueries(['admin-blogs']);
            setShowForm(false);
            setFormData({ title: '', content: '', excerpt: '', category: 'vedic', status: 'draft' });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to create blog');
        },
    });

    const deleteBlog = useMutation({
        mutationFn: async (id) => {
            await api.delete(`/blogs/${id}`);
        },
        onSuccess: () => {
            toast.success('Blog deleted successfully!');
            queryClient.invalidateQueries(['admin-blogs']);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to delete blog');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createBlog.mutate(formData);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-display text-2xl text-primary-gold">Manage Blogs</h1>
                <button onClick={() => setShowForm(!showForm)} className="btn-golden">
                    {showForm ? 'Cancel' : 'Create Blog'}
                </button>
            </div>

            {showForm && (
                <div className="glass-card p-6 mb-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white"
                            required
                        />
                        <textarea
                            placeholder="Content"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            rows={6}
                            className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Excerpt"
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white"
                        />
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white"
                        >
                            <option value="vedic">Vedic</option>
                            <option value="western">Western</option>
                            <option value="numerology">Numerology</option>
                            <option value="tarot">Tarot</option>
                            <option value="vastu">Vastu</option>
                            <option value="Spirituality">Spirituality</option>
                            <option value="Lifestyle">Lifestyle</option>
                        </select>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                        <button type="submit" className="btn-golden" disabled={createBlog.isPending}>
                            {createBlog.isPending ? 'Creating...' : 'Create Blog'}
                        </button>
                    </form>
                </div>
            )}

            <div className="glass-card overflow-hidden">
                <table className="w-full">
                    <thead className="bg-cosmic-purple-mid/50">
                        <tr>
                            <th className="text-left p-4 text-cosmic-lavender">Title</th>
                            <th className="text-left p-4 text-cosmic-lavender">Category</th>
                            <th className="text-left p-4 text-cosmic-lavender">Status</th>
                            <th className="text-left p-4 text-cosmic-lavender">Date</th>
                            <th className="text-left p-4 text-cosmic-lavender">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs?.map((blog) => (
                            <tr key={blog._id} className="border-t border-cosmic-purple-mid/30">
                                <td className="p-4 text-cosmic-off-white">{blog.title}</td>
                                <td className="p-4 text-cosmic-lavender capitalize">{blog.category}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs ${blog.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                        {blog.status}
                                    </span>
                                </td>
                                <td className="p-4 text-cosmic-lavender">{new Date(blog.createdAt).toLocaleDateString()}</td>
                                <td className="p-4">
                                    <button
                                        onClick={() => deleteBlog.mutate(blog._id)}
                                        className="text-red-400 hover:text-red-300 text-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBlogs;

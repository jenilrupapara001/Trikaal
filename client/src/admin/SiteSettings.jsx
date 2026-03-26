import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from '../services/api';

const SiteSettings = () => {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({});

    const { data: settings } = useQuery({
        queryKey: ['settings'],
        queryFn: async () => {
            const response = await api.get('/settings');
            return response.data.settings;
        },
    });

    useEffect(() => {
        if (settings) {
            setFormData(settings);
        }
    }, [settings]);

    const updateSettings = useMutation({
        mutationFn: async (data) => {
            const response = await api.put('/settings', data);
            return response.data;
        },
        onSuccess: () => {
            toast.success('Settings saved successfully!');
            queryClient.invalidateQueries(['settings']);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to save settings');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        updateSettings.mutate(formData);
    };

    return (
        <div>
            <h1 className="font-display text-2xl text-primary-gold mb-8">Site Settings</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="glass-card p-6">
                    <h2 className="font-display text-xl text-primary-gold mb-4">General Settings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-cosmic-lavender text-sm mb-2">Site Name</label>
                            <input type="text" value={formData.siteName || ''} onChange={(e) => setFormData({ ...formData, siteName: e.target.value })} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" />
                        </div>
                        <div>
                            <label className="block text-cosmic-lavender text-sm mb-2">Tagline</label>
                            <input type="text" value={formData.tagline || ''} onChange={(e) => setFormData({ ...formData, tagline: e.target.value })} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" />
                        </div>
                    </div>
                </div>

                <div className="glass-card p-6">
                    <h2 className="font-display text-xl text-primary-gold mb-4">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-cosmic-lavender text-sm mb-2">Contact Email</label>
                            <input type="email" value={formData.contactEmail || ''} onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" />
                        </div>
                        <div>
                            <label className="block text-cosmic-lavender text-sm mb-2">Phone</label>
                            <input type="text" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" />
                        </div>
                        <div>
                            <label className="block text-cosmic-lavender text-sm mb-2">WhatsApp</label>
                            <input type="text" value={formData.whatsapp || ''} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" />
                        </div>
                    </div>
                </div>

                <div className="glass-card p-6">
                    <h2 className="font-display text-xl text-primary-gold mb-4">Social Media</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-cosmic-lavender text-sm mb-2">Instagram</label>
                            <input type="url" value={formData.instagram || ''} onChange={(e) => setFormData({ ...formData, instagram: e.target.value })} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" placeholder="https://instagram.com/..." />
                        </div>
                        <div>
                            <label className="block text-cosmic-lavender text-sm mb-2">Facebook</label>
                            <input type="url" value={formData.facebook || ''} onChange={(e) => setFormData({ ...formData, facebook: e.target.value })} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" placeholder="https://facebook.com/..." />
                        </div>
                        <div>
                            <label className="block text-cosmic-lavender text-sm mb-2">YouTube</label>
                            <input type="url" value={formData.youtube || ''} onChange={(e) => setFormData({ ...formData, youtube: e.target.value })} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" placeholder="https://youtube.com/..." />
                        </div>
                    </div>
                </div>

                <div className="glass-card p-6">
                    <h2 className="font-display text-xl text-primary-gold mb-4">Hero Section</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-cosmic-lavender text-sm mb-2">Hero Heading</label>
                            <input type="text" value={formData.heroHeading || ''} onChange={(e) => setFormData({ ...formData, heroHeading: e.target.value })} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" />
                        </div>
                        <div>
                            <label className="block text-cosmic-lavender text-sm mb-2">Hero Subheading</label>
                            <textarea value={formData.heroSubheading || ''} onChange={(e) => setFormData({ ...formData, heroSubheading: e.target.value })} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" rows={2} />
                        </div>
                    </div>
                </div>

                <div className="glass-card p-6">
                    <h2 className="font-display text-xl text-primary-gold mb-4">SEO Settings</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-cosmic-lavender text-sm mb-2">Default Meta Title</label>
                            <input type="text" value={formData.defaultMetaTitle || ''} onChange={(e) => setFormData({ ...formData, defaultMetaTitle: e.target.value })} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" />
                        </div>
                        <div>
                            <label className="block text-cosmic-lavender text-sm mb-2">Default Meta Description</label>
                            <textarea value={formData.defaultMetaDescription || ''} onChange={(e) => setFormData({ ...formData, defaultMetaDescription: e.target.value })} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" rows={3} />
                        </div>
                        <div>
                            <label className="block text-cosmic-lavender text-sm mb-2">Google Analytics ID</label>
                            <input type="text" value={formData.googleAnalyticsId || ''} onChange={(e) => setFormData({ ...formData, googleAnalyticsId: e.target.value })} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" placeholder="G-XXXXXXXXXX" />
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn-golden" disabled={updateSettings.isPending}>
                    {updateSettings.isPending ? 'Saving...' : 'Save Settings'}
                </button>
            </form>
        </div>
    );
};

export default SiteSettings;

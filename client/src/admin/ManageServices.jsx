import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from '../services/api';

const ManageServices = () => {
    const queryClient = useQueryClient();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        fullDescription: '',
        category: 'vedic',
        icon: '✨',
        price: '',
        duration: '',
        isActive: true,
    });

    const { data: services } = useQuery({
        queryKey: ['admin-services'],
        queryFn: async () => {
            const response = await api.get('/services/admin/all');
            return response.data.services;
        },
    });

    const createService = useMutation({
        mutationFn: async (data) => {
            const response = await api.post('/services', data);
            return response.data;
        },
        onSuccess: () => {
            toast.success('Service created successfully!');
            queryClient.invalidateQueries(['admin-services']);
            setShowForm(false);
            setFormData({ title: '', shortDescription: '', fullDescription: '', category: 'vedic', icon: '✨', price: '', duration: '', isActive: true });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to create service');
        },
    });

    const deleteService = useMutation({
        mutationFn: async (id) => {
            await api.delete(`/services/${id}`);
        },
        onSuccess: () => {
            toast.success('Service deleted successfully!');
            queryClient.invalidateQueries(['admin-services']);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to delete service');
        },
    });

    const toggleActive = useMutation({
        mutationFn: async ({ id, isActive }) => {
            const response = await api.put(`/services/${id}`, { isActive });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['admin-services']);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createService.mutate(formData);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-display text-2xl text-primary-gold">Manage Services</h1>
                <button onClick={() => setShowForm(!showForm)} className="btn-golden">
                    {showForm ? 'Cancel' : 'Create Service'}
                </button>
            </div>

            {showForm && (
                <div className="glass-card p-6 mb-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" required />
                        <textarea placeholder="Short Description" value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" required />
                        <textarea placeholder="Full Description" value={formData.fullDescription} onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })} rows={4} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" required />
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Icon (emoji)" value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} className="p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" />
                            <input type="text" placeholder="Price (e.g., ₹3,500)" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" required />
                            <input type="text" placeholder="Duration (e.g., 90 minutes)" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" required />
                            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white">
                                <option value="vedic">Vedic</option>
                                <option value="western">Western</option>
                                <option value="numerology">Numerology</option>
                                <option value="tarot">Tarot</option>
                                <option value="vastu">Vastu</option>
                                <option value="kundali">Kundali</option>
                                <option value="compatibility">Compatibility</option>
                            </select>
                        </div>
                        <button type="submit" className="btn-golden" disabled={createService.isPending}>{createService.isPending ? 'Creating...' : 'Create Service'}</button>
                    </form>
                </div>
            )}

            <div className="glass-card overflow-hidden">
                <table className="w-full">
                    <thead className="bg-cosmic-purple-mid/50">
                        <tr>
                            <th className="text-left p-4 text-cosmic-lavender">Service</th>
                            <th className="text-left p-4 text-cosmic-lavender">Category</th>
                            <th className="text-left p-4 text-cosmic-lavender">Price</th>
                            <th className="text-left p-4 text-cosmic-lavender">Status</th>
                            <th className="text-left p-4 text-cosmic-lavender">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services?.map((service) => (
                            <tr key={service._id} className="border-t border-cosmic-purple-mid/30">
                                <td className="p-4 text-cosmic-off-white">{service.icon} {service.title}</td>
                                <td className="p-4 text-cosmic-lavender capitalize">{service.category}</td>
                                <td className="p-4 text-cosmic-lavender">{service.price}</td>
                                <td className="p-4">
                                    <button onClick={() => toggleActive.mutate({ id: service._id, isActive: !service.isActive })} className={`px-2 py-1 rounded text-xs ${service.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {service.isActive ? 'Active' : 'Inactive'}
                                    </button>
                                </td>
                                <td className="p-4">
                                    <button onClick={() => deleteService.mutate(service._id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageServices;

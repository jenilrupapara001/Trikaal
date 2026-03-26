import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from '../services/api';

const ManageHoroscopes = () => {
    const queryClient = useQueryClient();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        sign: 'aries',
        type: 'daily',
        date: new Date().toISOString().split('T')[0],
        content: '',
        luckyColor: '',
        luckyNumber: '',
        compatibility: '',
    });

    const { data: horoscopes } = useQuery({
        queryKey: ['admin-horoscopes'],
        queryFn: async () => {
            const response = await api.get('/horoscopes');
            return response.data.horoscopes;
        },
    });

    const createHoroscope = useMutation({
        mutationFn: async (data) => {
            const response = await api.post('/horoscopes', data);
            return response.data;
        },
        onSuccess: () => {
            toast.success('Horoscope created successfully!');
            queryClient.invalidateQueries(['admin-horoscopes']);
            setShowForm(false);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to create horoscope');
        },
    });

    const deleteHoroscope = useMutation({
        mutationFn: async (id) => {
            await api.delete(`/horoscopes/${id}`);
        },
        onSuccess: () => {
            toast.success('Horoscope deleted successfully!');
            queryClient.invalidateQueries(['admin-horoscopes']);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createHoroscope.mutate(formData);
    };

    const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-display text-2xl text-primary-gold">Manage Horoscopes</h1>
                <button onClick={() => setShowForm(!showForm)} className="btn-golden">
                    {showForm ? 'Cancel' : 'Add Horoscope'}
                </button>
            </div>

            {showForm && (
                <div className="glass-card p-6 mb-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <select value={formData.sign} onChange={(e) => setFormData({ ...formData, sign: e.target.value })} className="p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white">
                                {signs.map((sign) => (
                                    <option key={sign} value={sign}>{sign.charAt(0).toUpperCase() + sign.slice(1)}</option>
                                ))}
                            </select>
                            <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white">
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>
                        {formData.type === 'daily' && (
                            <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" />
                        )}
                        <textarea placeholder="Horoscope Content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={4} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" required />
                        <div className="grid grid-cols-3 gap-4">
                            <input type="text" placeholder="Lucky Color" value={formData.luckyColor} onChange={(e) => setFormData({ ...formData, luckyColor: e.target.value })} className="p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" />
                            <input type="number" placeholder="Lucky Number" value={formData.luckyNumber} onChange={(e) => setFormData({ ...formData, luckyNumber: e.target.value })} className="p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" />
                            <input type="text" placeholder="Compatibility" value={formData.compatibility} onChange={(e) => setFormData({ ...formData, compatibility: e.target.value })} className="p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" />
                        </div>
                        <button type="submit" className="btn-golden" disabled={createHoroscope.isPending}>
                            {createHoroscope.isPending ? 'Creating...' : 'Create Horoscope'}
                        </button>
                    </form>
                </div>
            )}

            <div className="glass-card overflow-hidden">
                <table className="w-full">
                    <thead className="bg-cosmic-purple-mid/50">
                        <tr>
                            <th className="text-left p-4 text-cosmic-lavender">Sign</th>
                            <th className="text-left p-4 text-cosmic-lavender">Type</th>
                            <th className="text-left p-4 text-cosmic-lavender">Date</th>
                            <th className="text-left p-4 text-cosmic-lavender">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {horoscopes?.map((horoscope) => (
                            <tr key={horoscope._id} className="border-t border-cosmic-purple-mid/30">
                                <td className="p-4 text-cosmic-off-white capitalize">{horoscope.sign}</td>
                                <td className="p-4 text-cosmic-lavender capitalize">{horoscope.type}</td>
                                <td className="p-4 text-cosmic-lavender">{horoscope.date ? new Date(horoscope.date).toLocaleDateString() : '-'}</td>
                                <td className="p-4">
                                    <button onClick={() => deleteHoroscope.mutate(horoscope._id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageHoroscopes;

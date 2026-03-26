import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
    const { data: bookingsData } = useQuery({
        queryKey: ['admin-bookings'],
        queryFn: async () => {
            const response = await api.get('/bookings');
            return response.data.bookings;
        },
    });

    const { data: contactsData } = useQuery({
        queryKey: ['admin-contacts'],
        queryFn: async () => {
            const response = await api.get('/contact');
            return response.data.contacts;
        },
    });

    const { data: blogsData } = useQuery({
        queryKey: ['admin-blogs'],
        queryFn: async () => {
            const response = await api.get('/blogs/admin/all');
            return response.data.blogs;
        },
    });

    const stats = [
        { name: 'Total Bookings', value: bookingsData?.length || 0, icon: '📅', color: 'bg-blue-500' },
        { name: 'Pending Bookings', value: bookingsData?.filter(b => b.status === 'pending').length || 0, icon: '⏳', color: 'bg-yellow-500' },
        { name: 'Blog Posts', value: blogsData?.length || 0, icon: '📝', color: 'bg-purple-500' },
        { name: 'Messages', value: contactsData?.length || 0, icon: '📬', color: 'bg-green-500' },
    ];

    return (
        <div>
            <h1 className="font-display text-2xl text-primary-gold mb-8">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="glass-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-cosmic-lavender text-sm">{stat.name}</p>
                                <p className="font-display text-3xl text-primary-gold mt-2">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-2xl`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Bookings */}
            <div className="glass-card p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-display text-xl text-primary-gold">Recent Bookings</h2>
                    <Link to="/admin/bookings" className="text-primary-gold text-sm hover:underline">View All</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-cosmic-lavender text-sm border-b border-cosmic-purple-mid">
                                <th className="pb-3">Name</th>
                                <th className="pb-3">Service</th>
                                <th className="pb-3">Date</th>
                                <th className="pb-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingsData?.slice(0, 5).map((booking) => (
                                <tr key={booking._id} className="border-b border-cosmic-purple-mid/30">
                                    <td className="py-3 text-cosmic-off-white">{booking.name}</td>
                                    <td className="py-3 text-cosmic-lavender">{booking.service?.title || 'N/A'}</td>
                                    <td className="py-3 text-cosmic-lavender">{new Date(booking.date).toLocaleDateString()}</td>
                                    <td className="py-3">
                                        <span className={`px-2 py-1 rounded text-xs ${booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                                booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                                                    booking.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                                                        'bg-red-500/20 text-red-400'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Messages */}
            <div className="glass-card p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-display text-xl text-primary-gold">Recent Messages</h2>
                    <Link to="/admin/contacts" className="text-primary-gold text-sm hover:underline">View All</Link>
                </div>
                <div className="space-y-3">
                    {contactsData?.slice(0, 3).map((contact) => (
                        <div key={contact._id} className="p-3 bg-cosmic-purple-mid/30 rounded-lg">
                            <div className="flex justify-between">
                                <span className="text-cosmic-off-white font-medium">{contact.name}</span>
                                <span className="text-cosmic-lavender text-xs">{new Date(contact.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-cosmic-lavender text-sm mt-1">{contact.subject}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/admin/AdminLayout';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const [stats, setStats] = useState([
        { label: 'Total Consultations', value: '0', trend: '+0%', icon: 'groups' },
        { label: 'Live Blogs', value: '0', trend: '+0%', icon: 'edit_note' },
        { label: 'Pending Requests', value: '0', trend: '+0%', icon: 'schedule' },
        { label: 'Total Users', value: '0', trend: '+3%', icon: 'person' }
    ]);
    const [recentInquiries, setRecentInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('token');
            const [consultationsRes, blogsRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_BASE_URL}/consultations`, {
                    headers: { 'x-auth-token': token }
                }),
                axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogs?limit=100`)
            ]);

            const consultations = consultationsRes.data;
            const blogs = blogsRes.data.blogs || [];

            setRecentInquiries(consultations.slice(0, 5));

            setStats([
                { label: 'Total Consultations', value: consultations.length.toString(), trend: '+12%', icon: 'groups' },
                { label: 'Live Blogs', value: blogs.length.toString(), trend: '+5%', icon: 'edit_note' },
                { label: 'Pending Requests', value: consultations.filter(c => c.status === 'New').length.toString(), trend: 'Active', icon: 'schedule' },
                { label: 'Celestial Revenue', value: `AED ${consultations.reduce((acc, c) => acc + (c.paymentStatus === 'Completed' ? c.amount : 0), 0)}`, trend: '+18%', icon: 'payments' }
            ]);

        } catch (err) {
            console.error('Error fetching dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout title="Celestial Overview">
            {loading ? (
                <div className="flex justify-center p-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-10"
                >
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="bg-surface-container-high p-6 rounded-2xl border border-primary/10 shadow-xl relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-6xl text-primary">{stat.icon}</span>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary">{stat.icon}</span>
                                    </div>
                                    <span className="text-[10px] text-green-400 font-bold px-2 py-0.5 rounded-full bg-green-400/10 border border-green-400/20">
                                        {stat.trend}
                                    </span>
                                </div>
                                <p className="text-on-surface-variant text-xs mb-1 uppercase tracking-widest font-bold">{stat.label}</p>
                                <p className="text-3xl font-headline font-bold text-on-surface">{stat.value}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Recent Content Table */}
                    <div className="bg-surface-container-high rounded-2xl border border-primary/10 overflow-hidden shadow-2xl">
                        <div className="px-8 py-6 border-b border-primary/10 flex justify-between items-center bg-surface-container-highest/30">
                            <div>
                                <h3 className="text-lg font-headline font-bold text-primary">Recent Inquiries</h3>
                                <p className="text-on-surface-variant text-[10px] uppercase tracking-widest">Awaiting celestial alignment</p>
                            </div>
                            <button className="text-primary text-xs font-bold hover:underline tracking-widest uppercase">View All Inquiries</button>
                        </div>
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-background/30 text-on-surface-variant text-[10px] uppercase tracking-widest font-bold">
                                    <th className="px-8 py-4">Client</th>
                                    <th className="px-8 py-4">Service</th>
                                    <th className="px-8 py-4">Amount</th>
                                    <th className="px-8 py-4">Status</th>
                                    <th className="px-8 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {recentInquiries.map((c, i) => (
                                    <tr key={i} className="border-t border-primary/5 hover:bg-primary/5 transition-all">
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-on-surface">{c.clientDetails.name}</span>
                                                <span className="text-[10px] text-on-surface-variant">{c.clientDetails.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col">
                                                <span className="text-on-surface">{c.serviceName}</span>
                                                <span className="text-[10px] text-primary/60 uppercase tracking-widest font-bold">{c.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-on-surface font-headline font-bold">{c.currency} {c.amount}</td>
                                        <td className="px-8 py-5">
                                            <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${c.status === 'Confirmed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                    c.status === 'New' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                }`}>
                                                {c.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button className="p-2 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary transition-all">
                                                <span className="material-symbols-outlined text-sm">visibility</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {recentInquiries.length === 0 && (
                            <div className="p-20 text-center text-on-surface-variant italic text-sm">
                                No recent inquiries found in the archives.
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AdminLayout>
    );
};

export default AdminDashboard;

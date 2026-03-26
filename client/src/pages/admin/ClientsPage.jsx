import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import { motion } from 'framer-motion';

const ClientsPage = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/consultations`, {
                headers: { 'x-auth-token': token }
            });

            // Extract unique clients from consultations
            const allConsultations = res.data;
            const uniqueClients = [];
            const seenEmails = new Set();

            allConsultations.forEach(consultation => {
                const email = consultation.clientDetails?.email;
                if (email && !seenEmails.has(email)) {
                    seenEmails.add(email);
                    uniqueClients.push({
                        id: consultation._id,
                        name: consultation.clientDetails?.name || 'Unknown',
                        email: email,
                        phone: consultation.clientDetails?.phone || 'N/A',
                        service: consultation.serviceName,
                        status: consultation.status,
                        date: consultation.createdAt
                    });
                }
            });

            setClients(uniqueClients);
        } catch (err) {
            console.error('Error fetching clients:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout title="Client Directory">
            {loading ? (
                <div className="flex justify-center p-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Search Bar */}
                    <div className="flex justify-between items-center gap-4">
                        <div className="relative flex-1 max-w-md">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/50">search</span>
                            <input
                                type="text"
                                placeholder="Search clients..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-surface-container border border-primary/10 rounded-full py-3 pl-12 pr-6 text-on-surface focus:border-primary/40 outline-none transition-all"
                            />
                        </div>
                        <div className="text-on-surface-variant text-sm">
                            {filteredClients.length} Client{filteredClients.length !== 1 ? 's' : ''}
                        </div>
                    </div>

                    {/* Clients Table */}
                    <div className="bg-surface-container rounded-2xl border border-primary/10 overflow-hidden shadow-2xl">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-background/30 text-on-surface-variant text-[10px] uppercase tracking-widest font-bold">
                                    <th className="px-8 py-4">Client</th>
                                    <th className="px-8 py-4">Contact</th>
                                    <th className="px-8 py-4">Service</th>
                                    <th className="px-8 py-4">Status</th>
                                    <th className="px-8 py-4">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {filteredClients.length > 0 ? (
                                    filteredClients.map((client, i) => (
                                        <tr key={i} className="border-t border-primary/5 hover:bg-primary/5 transition-all">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-on-primary font-bold">
                                                        {client.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="font-bold text-on-surface">{client.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-on-surface">{client.email}</span>
                                                    <span className="text-[10px] text-on-surface-variant">{client.phone}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="text-primary font-medium">{client.service}</span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${client.status === 'Confirmed' ? 'bg-green-500/10 text-green-400' :
                                                    client.status === 'New' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-blue-500/10 text-blue-400'
                                                    }`}>
                                                    {client.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-on-surface-variant">
                                                {new Date(client.date).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-20 text-center text-on-surface-variant italic">
                                            No clients found in the archives.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}
        </AdminLayout>
    );
};

export default ClientsPage;

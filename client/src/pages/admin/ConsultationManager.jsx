import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import { motion, AnimatePresence } from 'framer-motion';

const ConsultationManager = () => {
    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedConsultation, setSelectedConsultation] = useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [scheduleTime, setScheduleTime] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchConsultations();
    }, []);

    const fetchConsultations = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/consultations`, {
                headers: { 'x-auth-token': token }
            });
            setConsultations(res.data);
        } catch (err) {
            console.error('Error fetching consultations:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmRequest = (consultation) => {
        setSelectedConsultation(consultation);
        setIsConfirmModalOpen(true);
    };

    const confirmBooking = async () => {
        if (!scheduleTime) return alert('Please select a celestial time');

        setActionLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/consultations/${selectedConsultation._id}`,
                {
                    status: 'Confirmed',
                    scheduledAt: scheduleTime,
                    paymentStatus: 'Completed' // Assuming confirmation happens after payment or via admin override
                },
                { headers: { 'x-auth-token': token } }
            );

            setConsultations(consultations.map(c => c._id === res.data._id ? res.data : c));
            setIsConfirmModalOpen(false);
            setScheduleTime('');
            alert('Consultation confirmed and email sent!');
        } catch (err) {
            alert('Error confirming consultation');
        } finally {
            setActionLoading(false);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Confirmed': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'Paid': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'Cancelled': return 'bg-error/10 text-error border-error/20';
            default: return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
        }
    };

    return (
        <AdminLayout title="Consultation Registry">
            <div className="mb-8">
                <h2 className="text-2xl font-headline font-bold text-on-surface">Bookings & Inquiries</h2>
                <p className="text-on-surface-variant text-sm">Manage client sessions and schedule celestial guidance</p>
            </div>

            {loading ? (
                <div className="flex justify-center p-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
                </div>
            ) : (
                <div className="bg-surface-container-high rounded-2xl border border-primary/10 overflow-hidden shadow-2xl">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-background/50 border-b border-primary/10 text-on-surface-variant text-[10px] uppercase tracking-widest font-bold">
                                <th className="px-8 py-5">Client Info</th>
                                <th className="px-8 py-5">Service Type</th>
                                <th className="px-8 py-5">Scheduled For</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5">Amount</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-primary/5">
                            {consultations.map((c) => (
                                <tr key={c._id} className="hover:bg-primary/5 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <p className="text-on-surface font-bold">{c.clientDetails.name}</p>
                                            <p className="text-on-surface-variant text-[11px]">{c.clientDetails.email}</p>
                                            <p className="text-[10px] text-primary/60 font-mono mt-1">{c.clientDetails.phone}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <p className="text-on-surface text-sm font-medium">{c.serviceName}</p>
                                            <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">{c.type}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-on-surface text-sm">
                                            {c.scheduledAt ? (
                                                new Date(c.scheduledAt).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })
                                            ) : (
                                                <span className="text-on-surface-variant italic">Not Set</span>
                                            )}
                                        </p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getStatusStyle(c.status)}`}>
                                            {c.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 font-headline text-primary font-bold">
                                        {c.currency} {c.amount}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-3">
                                            {c.status === 'New' && (
                                                <button
                                                    onClick={() => handleConfirmRequest(c)}
                                                    className="px-4 py-2 rounded-lg bg-primary text-on-primary text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-md shadow-primary/20"
                                                >
                                                    Confirm
                                                </button>
                                            )}
                                            <button className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-highest transition-all">
                                                <span className="material-symbols-outlined text-sm">visibility</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Confirmation Modal */}
            <AnimatePresence>
                {isConfirmModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsConfirmModalOpen(false)}
                            className="absolute inset-0 bg-background/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-lg bg-surface-container rounded-3xl border border-primary/20 p-10 shadow-2xl"
                        >
                            <h3 className="text-2xl font-headline font-bold text-primary mb-2">Confirm Celestial Session</h3>
                            <p className="text-on-surface-variant text-sm mb-8">
                                Scheduling for <span className="text-on-surface font-bold">{selectedConsultation?.clientDetails.name}</span>.
                                This will send a professional confirmation email.
                            </p>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-primary px-1">Select Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        value={scheduleTime}
                                        onChange={e => setScheduleTime(e.target.value)}
                                        className="w-full bg-background border border-primary/20 rounded-xl px-5 py-3 text-sm focus:border-primary outline-none text-on-surface"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={() => setIsConfirmModalOpen(false)}
                                        className="flex-1 px-8 py-3 rounded-xl border border-primary/20 text-on-surface hover:bg-background/50 transition-all font-bold text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmBooking}
                                        disabled={actionLoading}
                                        className="flex-[2] gold-gradient text-on-primary px-8 py-3 rounded-xl shadow-xl shadow-primary/20 font-bold transition-all hover:scale-105 disabled:opacity-50"
                                    >
                                        {actionLoading ? 'Syncing...' : 'Schedule & Notify'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </AdminLayout>
    );
};

export default ConsultationManager;

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from '../services/api';

const ManageBookings = () => {
    const queryClient = useQueryClient();

    const { data: bookings } = useQuery({
        queryKey: ['admin-bookings'],
        queryFn: async () => {
            const response = await api.get('/bookings');
            return response.data.bookings;
        },
    });

    const updateStatus = useMutation({
        mutationFn: async ({ id, status }) => {
            const response = await api.put(`/bookings/${id}`, { status });
            return response.data;
        },
        onSuccess: () => {
            toast.success('Booking updated successfully!');
            queryClient.invalidateQueries(['admin-bookings']);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to update booking');
        },
    });

    const deleteBooking = useMutation({
        mutationFn: async (id) => {
            await api.delete(`/bookings/${id}`);
        },
        onSuccess: () => {
            toast.success('Booking deleted successfully!');
            queryClient.invalidateQueries(['admin-bookings']);
        },
    });

    return (
        <div>
            <h1 className="font-display text-2xl text-primary-gold mb-8">Manage Bookings</h1>

            <div className="glass-card overflow-hidden">
                <table className="w-full">
                    <thead className="bg-cosmic-purple-mid/50">
                        <tr>
                            <th className="text-left p-4 text-cosmic-lavender">Name</th>
                            <th className="text-left p-4 text-cosmic-lavender">Service</th>
                            <th className="text-left p-4 text-cosmic-lavender">Date</th>
                            <th className="text-left p-4 text-cosmic-lavender">Status</th>
                            <th className="text-left p-4 text-cosmic-lavender">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings?.map((booking) => (
                            <tr key={booking._id} className="border-t border-cosmic-purple-mid/30">
                                <td className="p-4 text-cosmic-off-white">
                                    <div>{booking.name}</div>
                                    <div className="text-cosmic-lavender text-sm">{booking.email}</div>
                                </td>
                                <td className="p-4 text-cosmic-lavender">{booking.service?.title || 'N/A'}</td>
                                <td className="p-4 text-cosmic-lavender">
                                    <div>{new Date(booking.date).toLocaleDateString()}</div>
                                    <div className="text-sm">{booking.time}</div>
                                </td>
                                <td className="p-4">
                                    <select
                                        value={booking.status}
                                        onChange={(e) => updateStatus.mutate({ id: booking._id, status: e.target.value })}
                                        className={`px-2 py-1 rounded text-xs cursor-pointer ${booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                                booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                                                    booking.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                                                        'bg-red-500/20 text-red-400'
                                            }`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td className="p-4">
                                    <button onClick={() => deleteBooking.mutate(booking._id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBookings;

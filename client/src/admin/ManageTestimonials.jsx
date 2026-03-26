import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from '../services/api';

const ManageTestimonials = () => {
    const queryClient = useQueryClient();

    const { data: testimonials } = useQuery({
        queryKey: ['admin-testimonials'],
        queryFn: async () => {
            const response = await api.get('/testimonials/all');
            return response.data.testimonials;
        },
    });

    const updateStatus = useMutation({
        mutationFn: async ({ id, status }) => {
            const response = await api.put(`/testimonials/${id}`, { status });
            return response.data;
        },
        onSuccess: () => {
            toast.success('Testimonial updated successfully!');
            queryClient.invalidateQueries(['admin-testimonials']);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to update testimonial');
        },
    });

    const deleteTestimonial = useMutation({
        mutationFn: async (id) => {
            await api.delete(`/testimonials/${id}`);
        },
        onSuccess: () => {
            toast.success('Testimonial deleted successfully!');
            queryClient.invalidateQueries(['admin-testimonials']);
        },
    });

    return (
        <div>
            <h1 className="font-display text-2xl text-primary-gold mb-8">Manage Testimonials</h1>

            <div className="glass-card overflow-hidden">
                <table className="w-full">
                    <thead className="bg-cosmic-purple-mid/50">
                        <tr>
                            <th className="text-left p-4 text-cosmic-lavender">Name</th>
                            <th className="text-left p-4 text-cosmic-lavender">Rating</th>
                            <th className="text-left p-4 text-cosmic-lavender">Content</th>
                            <th className="text-left p-4 text-cosmic-lavender">Status</th>
                            <th className="text-left p-4 text-cosmic-lavender">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testimonials?.map((testimonial) => (
                            <tr key={testimonial._id} className="border-t border-cosmic-purple-mid/30">
                                <td className="p-4 text-cosmic-off-white">
                                    <div>{testimonial.name}</div>
                                    <div className="text-cosmic-lavender text-sm">{testimonial.location}</div>
                                </td>
                                <td className="p-4 text-primary-gold">{'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}</td>
                                <td className="p-4 text-cosmic-lavender max-w-xs truncate">{testimonial.content}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs ${testimonial.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                        {testimonial.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        {testimonial.status === 'pending' && (
                                            <button onClick={() => updateStatus.mutate({ id: testimonial._id, status: 'approved' })} className="text-green-400 hover:text-green-300 text-sm">Approve</button>
                                        )}
                                        <button onClick={() => deleteTestimonial.mutate(testimonial._id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageTestimonials;

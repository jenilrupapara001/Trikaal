import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from '../services/api';

const ManageContacts = () => {
    const queryClient = useQueryClient();

    const { data: contacts } = useQuery({
        queryKey: ['admin-contacts'],
        queryFn: async () => {
            const response = await api.get('/contact');
            return response.data.contacts;
        },
    });

    const markAsRead = useMutation({
        mutationFn: async (id) => {
            const response = await api.put(`/contact/${id}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['admin-contacts']);
        },
    });

    const deleteContact = useMutation({
        mutationFn: async (id) => {
            await api.delete(`/contact/${id}`);
        },
        onSuccess: () => {
            toast.success('Contact deleted successfully!');
            queryClient.invalidateQueries(['admin-contacts']);
        },
    });

    return (
        <div>
            <h1 className="font-display text-2xl text-primary-gold mb-8">Manage Contacts</h1>

            <div className="glass-card overflow-hidden">
                <table className="w-full">
                    <thead className="bg-cosmic-purple-mid/50">
                        <tr>
                            <th className="text-left p-4 text-cosmic-lavender">Name</th>
                            <th className="text-left p-4 text-cosmic-lavender">Email</th>
                            <th className="text-left p-4 text-cosmic-lavender">Subject</th>
                            <th className="text-left p-4 text-cosmic-lavender">Status</th>
                            <th className="text-left p-4 text-cosmic-lavender">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts?.map((contact) => (
                            <tr key={contact._id} className="border-t border-cosmic-purple-mid/30">
                                <td className="p-4 text-cosmic-off-white">{contact.name}</td>
                                <td className="p-4 text-cosmic-lavender">{contact.email}</td>
                                <td className="p-4 text-cosmic-lavender">{contact.subject}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs ${contact.isRead ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                        {contact.isRead ? 'Read' : 'Unread'}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        {!contact.isRead && (
                                            <button onClick={() => markAsRead.mutate(contact._id)} className="text-primary-gold hover:text-gold-light text-sm">Mark Read</button>
                                        )}
                                        <button onClick={() => deleteContact.mutate(contact._id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
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

export default ManageContacts;

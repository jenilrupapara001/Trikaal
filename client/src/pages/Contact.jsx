import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import api from '../services/api';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SEOHead from '../components/common/SEOHead';
import StarBackground from '../components/common/StarBackground';

const contactSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email'),
    subject: z.string().min(5, 'Subject is required'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

const Contact = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(contactSchema),
    });

    const sendMessage = useMutation({
        mutationFn: async (data) => {
            const response = await api.post('/contact', data);
            return response.data;
        },
        onSuccess: () => {
            toast.success('Message sent successfully!');
            reset();
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to send message');
        },
    });

    const onSubmit = (data) => {
        sendMessage.mutate(data);
    };

    return (
        <>
            <SEOHead
                title="Contact Us"
                description="Get in touch with CosmicGuru for astrology consultations and inquiries."
            />

            <div className="min-h-screen cosmic-bg">
                <StarBackground />
                <Navbar />

                <section className="pt-32 pb-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-gold text-center mb-8">
                                Contact Us
                            </h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="glass-card p-8">
                                    <h2 className="font-display text-xl text-primary-gold mb-6">Send us a Message</h2>
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                        <div>
                                            <label className="block text-cosmic-lavender text-sm mb-2">Name</label>
                                            <input {...register('name')} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" />
                                            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-cosmic-lavender text-sm mb-2">Email</label>
                                            <input {...register('email')} type="email" className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" />
                                            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-cosmic-lavender text-sm mb-2">Subject</label>
                                            <input {...register('subject')} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" />
                                            {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-cosmic-lavender text-sm mb-2">Message</label>
                                            <textarea {...register('message')} rows={5} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" />
                                            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
                                        </div>
                                        <button type="submit" className="btn-golden w-full" disabled={sendMessage.isPending}>
                                            {sendMessage.isPending ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </form>
                                </div>

                                <div className="space-y-8">
                                    <div className="glass-card p-8">
                                        <h3 className="font-display text-xl text-primary-gold mb-4">Get in Touch</h3>
                                        <p className="text-cosmic-lavender mb-6">
                                            Have questions about our services? We're here to help!
                                        </p>
                                        <div className="space-y-4">
                                            <div className="flex items-center text-cosmic-lavender">
                                                <svg className="w-5 h-5 mr-3 text-primary-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                contact@cosmicguru.com
                                            </div>
                                            <div className="flex items-center text-cosmic-lavender">
                                                <svg className="w-5 h-5 mr-3 text-primary-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                +91 98765 43210
                                            </div>
                                            <div className="flex items-center text-cosmic-lavender">
                                                <svg className="w-5 h-5 mr-3 text-primary-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                Mumbai, India
                                            </div>
                                        </div>
                                    </div>

                                    <a
                                        href="https://wa.me/919876543210"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="glass-card p-6 flex items-center justify-center hover:bg-green-600/20 transition-colors"
                                    >
                                        <svg className="w-8 h-8 text-green-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        <span className="text-green-400 font-body">Chat on WhatsApp</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default Contact;

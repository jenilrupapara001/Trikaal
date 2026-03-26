import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import api from '../services/api';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SEOHead from '../components/common/SEOHead';
import StarBackground from '../components/common/StarBackground';

const bookingSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(10, 'Phone is required'),
    date: z.string().min(1, 'Date is required'),
    time: z.string().min(1, 'Time is required'),
    dob: z.string().optional(),
    birthTime: z.string().optional(),
    birthPlace: z.string().optional(),
    message: z.string().optional(),
});

const Booking = () => {
    const [searchParams] = useSearchParams();
    const serviceId = searchParams.get('service');
    const [step, setStep] = useState(1);

    const { data: services } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const response = await api.get('/services');
            return response.data.services;
        },
    });

    const [selectedService, setSelectedService] = useState(serviceId || '');

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(bookingSchema),
    });

    const createBooking = useMutation({
        mutationFn: async (data) => {
            const response = await api.post('/bookings', {
                ...data,
                service: selectedService,
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success('Booking submitted successfully!');
            reset();
            setStep(4);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Booking failed');
        },
    });

    const onSubmit = (data) => {
        createBooking.mutate(data);
    };

    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    ];

    return (
        <>
            <SEOHead
                title="Book a Reading"
                description="Book your astrology reading session with CosmicGuru."
            />

            <div className="min-h-screen cosmic-bg">
                <StarBackground />
                <Navbar />

                <section className="pt-32 pb-20">
                    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-gold text-center mb-8">
                                Book a Reading
                            </h1>

                            {/* Steps */}
                            <div className="flex justify-center mb-8">
                                {[1, 2, 3, 4].map((s) => (
                                    <div key={s} className="flex items-center">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display ${step >= s ? 'bg-primary-gold text-cosmic-charcoal' : 'glass-card text-cosmic-lavender'
                                            }`}>
                                            {s}
                                        </div>
                                        {s < 4 && (
                                            <div className={`w-16 h-0.5 ${step > s ? 'bg-primary-gold' : 'bg-cosmic-purple-mid'}`} />
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="glass-card p-8">
                                {step === 1 && (
                                    <div>
                                        <h2 className="font-display text-xl text-primary-gold mb-4">Select a Service</h2>
                                        <div className="space-y-3">
                                            {services?.map((service) => (
                                                <div
                                                    key={service._id}
                                                    onClick={() => setSelectedService(service._id)}
                                                    className={`p-4 rounded-lg cursor-pointer transition-all ${selectedService === service._id
                                                            ? 'bg-primary-gold/20 border-2 border-primary-gold'
                                                            : 'bg-cosmic-purple-mid/30 border-2 border-transparent hover:border-primary-gold/50'
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <span className="text-2xl mr-2">{service.icon}</span>
                                                            <span className="font-display text-primary-gold">{service.title}</span>
                                                        </div>
                                                        <span className="text-cosmic-lavender">{service.price}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => selectedService && setStep(2)}
                                            disabled={!selectedService}
                                            className="btn-golden w-full mt-6 disabled:opacity-50"
                                        >
                                            Continue
                                        </button>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div>
                                        <h2 className="font-display text-xl text-primary-gold mb-4">Select Date & Time</h2>
                                        <div className="mb-4">
                                            <label className="block text-cosmic-lavender text-sm mb-2">Date</label>
                                            <input
                                                type="date"
                                                {...register('date')}
                                                className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white"
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                            {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date.message}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-cosmic-lavender text-sm mb-2">Time</label>
                                            <div className="grid grid-cols-4 gap-2">
                                                {timeSlots.map((time) => (
                                                    <label key={time} className="flex items-center justify-center p-2 bg-cosmic-purple-mid/30 rounded-lg cursor-pointer hover:bg-primary-gold/20">
                                                        <input type="radio" value={time} {...register('time')} className="sr-only" />
                                                        <span className="text-sm text-cosmic-lavender">{time}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            {errors.time && <p className="text-red-400 text-sm mt-1">{errors.time.message}</p>}
                                        </div>
                                        <div className="flex gap-4">
                                            <button onClick={() => setStep(1)} className="flex-1 py-3 border border-primary-gold text-primary-gold rounded-lg">Back</button>
                                            <button onClick={() => setStep(3)} className="btn-golden flex-1">Continue</button>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <h2 className="font-display text-xl text-primary-gold mb-4">Your Information</h2>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-cosmic-lavender text-sm mb-2">Name *</label>
                                                <input {...register('name')} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" />
                                                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-cosmic-lavender text-sm mb-2">Email *</label>
                                                <input {...register('email')} type="email" className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" />
                                                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-cosmic-lavender text-sm mb-2">Phone *</label>
                                                <input {...register('phone')} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" />
                                                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-cosmic-lavender text-sm mb-2">Date of Birth</label>
                                                <input {...register('dob')} type="date" className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" />
                                            </div>
                                            <div>
                                                <label className="block text-cosmic-lavender text-sm mb-2">Birth Time</label>
                                                <input {...register('birthTime')} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" placeholder="Exact time if known" />
                                            </div>
                                            <div>
                                                <label className="block text-cosmic-lavender text-sm mb-2">Birth Place</label>
                                                <input {...register('birthPlace')} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" />
                                            </div>
                                            <div>
                                                <label className="block text-cosmic-lavender text-sm mb-2">Message</label>
                                                <textarea {...register('message')} rows={3} className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white" />
                                            </div>
                                        </div>
                                        <div className="flex gap-4 mt-6">
                                            <button type="button" onClick={() => setStep(2)} className="flex-1 py-3 border border-primary-gold text-primary-gold rounded-lg">Back</button>
                                            <button type="submit" className="btn-golden flex-1" disabled={createBooking.isPending}>
                                                {createBooking.isPending ? 'Submitting...' : 'Submit Booking'}
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {step === 4 && (
                                    <div className="text-center py-8">
                                        <div className="text-6xl mb-4">✅</div>
                                        <h2 className="font-display text-2xl text-primary-gold mb-4">Booking Confirmed!</h2>
                                        <p className="text-cosmic-lavender mb-6">
                                            Thank you for your booking. We will send a confirmation email shortly.
                                        </p>
                                        <a href="/" className="btn-golden">Return Home</a>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default Booking;

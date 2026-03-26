import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import SEOHead from '../components/common/SEOHead';
import StarBackground from '../components/common/StarBackground';

const loginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await login(data.email, data.password);
            toast.success('Login successful!');
            navigate('/admin');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <SEOHead title="Admin Login" />

            <div className="min-h-screen cosmic-bg flex items-center justify-center">
                <StarBackground />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 w-full max-w-md px-4"
                >
                    <div className="glass-card p-8">
                        <div className="text-center mb-8">
                            <h1 className="font-display text-3xl font-bold gradient-text">
                                CosmicGuru
                            </h1>
                            <p className="text-cosmic-lavender mt-2">Admin Login</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-cosmic-lavender text-sm mb-2">Email</label>
                                <input
                                    {...register('email')}
                                    type="email"
                                    className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white"
                                    placeholder="admin@cosmicguru.com"
                                />
                                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label className="block text-cosmic-lavender text-sm mb-2">Password</label>
                                <input
                                    {...register('password')}
                                    type="password"
                                    className="w-full p-3 bg-cosmic-purple-mid/30 border border-cosmic-purple-light rounded-lg text-cosmic-off-white"
                                    placeholder="••••••••"
                                />
                                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
                            </div>
                            <button
                                type="submit"
                                className="btn-golden w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <a href="/" className="text-cosmic-lavender text-sm hover:text-primary-gold">
                                ← Back to Website
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Login;

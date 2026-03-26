import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const AdminLayout = ({ children, title }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const menuItems = [
        { name: 'Overview', path: '/admin', icon: 'dashboard' },
        { name: 'Consultations', path: '/admin/consultations', icon: 'schedule' },
        { name: 'Blog Manager', path: '/admin/blogs', icon: 'edit_note' },
        { name: 'Clients', path: '/admin/clients', icon: 'person' },
        { name: 'Settings', path: '/admin/settings', icon: 'settings' },
    ];

    return (
        <div className="min-h-screen bg-background flex text-on-surface">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`w-64 bg-surface-container border-r border-primary/10 p-4 md:p-6 flex flex-col sticky top-0 h-screen fixed lg:relative z-50 transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div
                    onClick={() => navigate('/')}
                    className="text-xl md:text-2xl font-headline font-bold text-primary mb-8 md:mb-12 italic cursor-pointer flex items-center gap-2"
                >
                    <span className="material-symbols-outlined text-primary">auto_awesome</span>
                    <span className="hidden lg:block">Trikaal Admin</span>
                </div>

                <nav className="flex-1 space-y-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/admin'}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-3 md:px-4 py-3 rounded-xl text-sm font-medium transition-all group
                                ${isActive
                                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/20'
                                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-primary'
                                }
                            `}
                        >
                            <span className="material-symbols-outlined text-xl">{item.icon}</span>
                            <span className="hidden md:inline">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="mt-auto pt-4 md:pt-6 border-t border-primary/10">
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-3 md:px-4 py-3 rounded-xl text-sm text-error hover:bg-error/10 transition-all"
                    >
                        <span className="material-symbols-outlined text-xl">logout</span>
                        <span className="hidden md:inline">Abandon Archive</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0">
                <header className="h-16 md:h-20 border-b border-primary/10 flex items-center justify-between px-4 md:px-10 bg-background/80 backdrop-blur-md sticky top-0 z-40">
                    <button
                        className="lg:hidden text-primary p-2"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="material-symbols-outlined text-2xl">menu</span>
                    </button>
                    <div className="flex-1 md:text-left text-center">
                        <h1 className="text-lg md:text-xl font-headline font-bold text-primary tracking-wide">
                            {title || 'Celestial Overview'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative text-on-surface-variant hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
                        </button>
                        <div className="h-8 w-[1px] bg-primary/20"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-on-surface">Acharya Varma</p>
                                <p className="text-[10px] text-primary/60 uppercase tracking-widest font-bold">High Priest</p>
                            </div>
                            <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-on-primary font-bold shadow-lg">
                                AV
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-4 md:p-10">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;

import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
    const { isAuthenticated, isAdmin, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen bg-cosmic-charcoal flex items-center justify-center">
                <div className="w-20 h-20 border-4 border-primary-gold/20 rounded-full"></div>
                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-primary-gold rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthenticated || !isAdmin) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: '📊' },
        { name: 'Blogs', path: '/admin/blogs', icon: '📝' },
        { name: 'Services', path: '/admin/services', icon: '✨' },
        { name: 'Horoscopes', path: '/admin/horoscopes', icon: '🌟' },
        { name: 'Bookings', path: '/admin/bookings', icon: '📅' },
        { name: 'Testimonials', path: '/admin/testimonials', icon: '💬' },
        { name: 'Contacts', path: '/admin/contacts', icon: '📬' },
        { name: 'Settings', path: '/admin/settings', icon: '⚙️' },
    ];

    return (
        <div className="min-h-screen bg-cosmic-charcoal flex">
            {/* Sidebar */}
            <aside className="w-64 bg-cosmic-purple fixed h-full overflow-y-auto">
                <div className="p-6">
                    <Link to="/" className="font-display text-xl font-bold gradient-text">
                        CosmicGuru
                    </Link>
                    <p className="text-cosmic-lavender text-xs mt-1">Admin Panel</p>
                </div>

                <nav className="px-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-4 py-3 rounded-lg mb-2 transition-colors ${location.pathname === item.path
                                    ? 'bg-primary-gold text-cosmic-charcoal'
                                    : 'text-cosmic-lavender hover:bg-cosmic-purple-mid'
                                }`}
                        >
                            <span className="mr-3">{item.icon}</span>
                            <span className="font-body text-sm">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-64 p-4">
                    <Link
                        to="/"
                        className="flex items-center justify-center px-4 py-2 text-cosmic-lavender hover:text-primary-gold text-sm"
                    >
                        ← Back to Website
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;

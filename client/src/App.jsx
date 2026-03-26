import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Horoscope from './pages/Horoscope';
import HoroscopeDetail from './pages/HoroscopeDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import ManageBlogs from './admin/ManageBlogs';
import ManageServices from './admin/ManageServices';
import ManageHoroscopes from './admin/ManageHoroscopes';
import ManageBookings from './admin/ManageBookings';
import ManageTestimonials from './admin/ManageTestimonials';
import ManageContacts from './admin/ManageContacts';
import SiteSettings from './admin/SiteSettings';

// Components
import ScrollToTop from './components/common/ScrollToTop';

function App() {
    return (
        <>
            <ScrollToTop />
            <AnimatePresence mode="wait">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/services/:slug" element={<ServiceDetail />} />
                    <Route path="/horoscope" element={<Horoscope />} />
                    <Route path="/horoscope/:sign" element={<HoroscopeDetail />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/admin/login" element={<Login />} />

                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="blogs" element={<ManageBlogs />} />
                        <Route path="services" element={<ManageServices />} />
                        <Route path="horoscopes" element={<ManageHoroscopes />} />
                        <Route path="bookings" element={<ManageBookings />} />
                        <Route path="testimonials" element={<ManageTestimonials />} />
                        <Route path="contacts" element={<ManageContacts />} />
                        <Route path="settings" element={<SiteSettings />} />
                    </Route>

                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AnimatePresence>
        </>
    );
}

export default App;

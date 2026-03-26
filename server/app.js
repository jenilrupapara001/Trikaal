import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Route imports
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import horoscopeRoutes from './routes/horoscopeRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';

// Middleware imports
import { errorHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';

dotenv.config();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security
app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}));

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Rate limiting
app.use('/api', apiLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/horoscopes', horoscopeRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/settings', settingsRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Sitemap generation
app.get('/sitemap.xml', async (req, res) => {
    const Blog = (await import('./models/Blog.js')).default;
    const Service = (await import('./models/Service.js')).default;

    const baseUrl = process.env.CLIENT_URL || 'http://localhost:5173';

    const blogs = await Blog.find({ status: 'published' }).select('slug');
    const services = await Service.find({ isActive: true }).select('slug');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/services</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/horoscope</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/booking</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  ${services.map(s => `
  <url>
    <loc>${baseUrl}/services/${s.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  ${blogs.map(b => `
  <url>
    <loc>${baseUrl}/blog/${b.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// Error handler
app.use(errorHandler);

export default app;

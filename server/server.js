import app from './app.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
            console.log(`Health check: http://localhost:${PORT}/api/health`);
            console.log(`Sitemap: http://localhost:${PORT}/sitemap.xml`);
        });
    } catch (error) {
        console.error(`Error starting server: ${error.message}`);
        process.exit(1);
    }
};

startServer();

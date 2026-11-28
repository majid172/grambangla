import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRoutes from './routes/index.js';
import { config } from './config/index.js';
const app = express();
// Middlewares
app.use(cors({
    origin: '*', // Allows Next.js frontend or local testing
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (config.nodeEnv !== 'test') {
    app.use(morgan('dev'));
}
// API Routes
app.use('/api', apiRoutes);
// Root Welcome Route
app.get('/', (_req, res) => {
    res.json({
        message: 'Welcome to গ্রামবাংলা (GramBangla) Organic Food API Service',
        docs: '/api/health',
        endpoints: {
            products: '/api/products',
            categories: '/api/categories',
            orders: '/api/orders',
            coupons: '/api/coupons',
            settings: '/api/settings',
            dashboard: '/api/dashboard/stats',
            customers: '/api/customers',
            contact: '/api/contact',
            newsletter: '/api/newsletter',
            auth: '/api/auth/login',
        },
    });
});
// 404 Handler
app.use((_req, res) => {
    res.status(404).json({ success: false, message: 'Endpoint not found' });
});
// Global Error Handler
app.use((err, _req, res, _next) => {
    console.error('Unhandled server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: config.nodeEnv === 'development' ? err.message : undefined,
    });
});
export default app;

import { Router } from 'express';
import productRoutes from './product.routes.js';
import categoryRoutes from './category.routes.js';
import orderRoutes from './order.routes.js';
import couponRoutes from './coupon.routes.js';
import settingsRoutes from './settings.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import contactRoutes from './contact.routes.js';
import authRoutes from './auth.routes.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({
    status: 'healthy',
    service: 'গ্রামবাংলা E-commerce API',
    timestamp: new Date().toISOString(),
  });
});

router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/orders', orderRoutes);
router.use('/coupons', couponRoutes);
router.use('/settings', settingsRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/auth', authRoutes);
router.use('/', contactRoutes);

export default router;


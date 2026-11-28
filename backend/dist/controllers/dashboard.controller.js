import { db } from '../storage/db.js';
// GET /api/dashboard/stats (Admin)
export const getDashboardStats = (_req, res) => {
    try {
        const orders = db.orders.getAll();
        const products = db.products.getAll();
        const customers = db.customers.getAll();
        const validOrders = orders.filter((o) => o.status !== 'Cancelled');
        const totalRevenue = validOrders.reduce((sum, o) => sum + o.total, 0);
        const totalOrders = orders.length;
        const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
        const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;
        const deliveredRate = totalOrders > 0 ? Math.round((deliveredOrders / totalOrders) * 100) : 0;
        const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
        const lowStockCount = products.filter((p) => p.stockCount < 10).length;
        // Category revenue shares
        const categoryRevenue = {};
        validOrders.forEach((o) => {
            o.items.forEach((it) => {
                const cat = it.product?.category || 'other';
                categoryRevenue[cat] = (categoryRevenue[cat] || 0) + (it.product?.price || 0) * it.quantity;
            });
        });
        res.json({
            success: true,
            data: {
                totalRevenue,
                totalOrders,
                pendingOrders,
                deliveredOrders,
                deliveredRate,
                avgOrderValue,
                totalCustomers: customers.length,
                totalProducts: products.length,
                lowStockCount,
                categoryRevenue,
                recentOrders: orders.slice(0, 5),
                lowStockProducts: products.filter((p) => p.stockCount < 10),
            },
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch dashboard stats', error });
    }
};

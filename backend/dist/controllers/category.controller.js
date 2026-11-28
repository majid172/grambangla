import { db } from '../storage/db.js';
// GET /api/categories
export const getCategories = (_req, res) => {
    try {
        const categories = db.categories.getAll();
        res.json({ success: true, count: categories.length, data: categories });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch categories', error });
    }
};
// GET /api/categories/:slug
export const getCategoryBySlug = (req, res) => {
    try {
        const { slug } = req.params;
        const category = db.categories.getBySlug(slug);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        const products = db.products.getAll().filter((p) => p.category === slug);
        res.json({
            success: true,
            data: {
                ...category,
                products,
            },
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch category', error });
    }
};

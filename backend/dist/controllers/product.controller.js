import { db } from '../storage/db.js';
// GET /api/products
export const getProducts = (req, res) => {
    try {
        let products = db.products.getAll();
        const { category, search, minPrice, maxPrice, inStock, featured, sort } = req.query;
        if (category && category !== 'all') {
            products = products.filter((p) => p.category === category);
        }
        if (search && typeof search === 'string') {
            const q = search.toLowerCase().trim();
            products = products.filter((p) => p.nameBn.toLowerCase().includes(q) ||
                p.nameEn.toLowerCase().includes(q) ||
                p.shortDescBn.toLowerCase().includes(q) ||
                p.sourceLocation.toLowerCase().includes(q));
        }
        if (minPrice) {
            const min = Number(minPrice);
            if (!isNaN(min))
                products = products.filter((p) => p.price >= min);
        }
        if (maxPrice) {
            const max = Number(maxPrice);
            if (!isNaN(max))
                products = products.filter((p) => p.price <= max);
        }
        if (inStock === 'true') {
            products = products.filter((p) => p.inStock);
        }
        if (featured === 'true') {
            products = products.filter((p) => p.featured);
        }
        if (sort) {
            if (sort === 'price-low')
                products.sort((a, b) => a.price - b.price);
            else if (sort === 'price-high')
                products.sort((a, b) => b.price - a.price);
            else if (sort === 'rating')
                products.sort((a, b) => b.rating - a.rating);
        }
        res.json({
            success: true,
            count: products.length,
            data: products,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch products', error });
    }
};
// GET /api/products/:slugOrId
export const getProductBySlugOrId = (req, res) => {
    try {
        const { slugOrId } = req.params;
        let product = db.products.getBySlug(slugOrId);
        if (!product) {
            product = db.products.getById(slugOrId);
        }
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        // Get related products from same category
        const related = db.products
            .getAll()
            .filter((p) => p.category === product.category && p.id !== product.id)
            .slice(0, 4);
        res.json({
            success: true,
            data: product,
            related,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch product', error });
    }
};
// POST /api/products (Admin)
export const createProduct = (req, res) => {
    try {
        const body = req.body;
        if (!body.nameBn || !body.price) {
            return res.status(400).json({ success: false, message: 'nameBn and price are required' });
        }
        const slug = body.nameEn
            ? body.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            : `product-${Date.now()}`;
        const newProduct = {
            id: `gb-${Date.now()}`,
            slug: body.slug || slug,
            nameBn: body.nameBn,
            nameEn: body.nameEn || body.nameBn,
            category: body.category || 'mustard-oil',
            categoryNameBn: body.categoryNameBn || 'অর্গানিক ফুড',
            shortDescBn: body.shortDescBn || 'গ্রামবাংলার নিজস্ব তত্ত্বাবধানে প্রস্তুত খাঁটি ও পুষ্টিকর খাদ্যপণ্য।',
            fullDescBn: body.fullDescBn || 'কোনো প্রকার রাসায়নিক ও প্রিজারভেটিভ মুক্ত শতভাগ খাঁটি দেশীয় খাবার।',
            price: Number(body.price),
            originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
            discountPercent: body.originalPrice
                ? Math.round(((Number(body.originalPrice) - Number(body.price)) / Number(body.originalPrice)) * 100)
                : undefined,
            unit: body.unit || '১ একক',
            inStock: body.inStock !== undefined ? body.inStock : true,
            stockCount: body.stockCount !== undefined ? Number(body.stockCount) : 50,
            rating: 5.0,
            reviewCount: 0,
            featured: body.featured || false,
            isBestseller: body.isBestseller || false,
            organicCertified: true,
            image: body.image || 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
            gallery: body.gallery || [body.image || 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80'],
            badge: body.badge,
            sourceLocation: body.sourceLocation || 'বাংলাদেশ',
            nutritionalHighlights: body.nutritionalHighlights || ['১০০% খাঁটি ও প্রাকৃতিক', 'প্রিজারভেটিভ মুক্ত'],
        };
        const saved = db.products.create(newProduct);
        res.status(201).json({ success: true, message: 'Product created successfully', data: saved });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create product', error });
    }
};
// PUT /api/products/:id (Admin)
export const updateProduct = (req, res) => {
    try {
        const { id } = req.params;
        const updated = db.products.update(id, req.body);
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, message: 'Product updated successfully', data: updated });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update product', error });
    }
};
// PATCH /api/products/:id/stock (Admin)
export const updateProductStock = (req, res) => {
    try {
        const { id } = req.params;
        const { stockCount, inStock } = req.body;
        const updates = {};
        if (stockCount !== undefined)
            updates.stockCount = Number(stockCount);
        if (inStock !== undefined)
            updates.inStock = Boolean(inStock);
        const updated = db.products.update(id, updates);
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, message: 'Product stock updated', data: updated });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update stock', error });
    }
};
// DELETE /api/products/:id (Admin)
export const deleteProduct = (req, res) => {
    try {
        const { id } = req.params;
        const deleted = db.products.delete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, message: 'Product deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete product', error });
    }
};

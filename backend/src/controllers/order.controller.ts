import { Request, Response } from 'express';
import { db } from '../storage/db.js';
import { OrderDetails } from '../types/index.js';

// GET /api/orders (Admin)
export const getOrders = (req: Request, res: Response) => {
  try {
    let orders = db.orders.getAll();
    const { status, search } = req.query;

    if (status && status !== 'all') {
      orders = orders.filter((o) => o.status === status);
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase().trim();
      orders = orders.filter(
        (o) =>
          o.orderId.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.phone.includes(q) ||
          o.address.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders', error });
  }
};

// GET /api/orders/:orderId
export const getOrderById = (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = db.orders.getById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch order', error });
  }
};

// POST /api/orders (Customer checkout)
export const createOrder = (req: Request, res: Response) => {
  try {
    const {
      customerName,
      phone,
      email,
      address,
      city,
      deliveryMethod,
      paymentMethod,
      items,
      couponCode,
      notes,
    } = req.body;

    if (!customerName || !phone || !address || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, address and at least one item are required',
      });
    }

    const settings = db.settings.get();

    // Calculate subtotal from products in database for security
    let subtotal = 0;
    const processedItems = items.map((it: any) => {
      const prod = db.products.getById(it.product?.id || it.productId);
      const price = prod ? prod.price : Number(it.price || it.product?.price || 0);
      const qty = Number(it.quantity || 1);
      subtotal += price * qty;
      return {
        product: prod || it.product,
        quantity: qty,
      };
    });

    // Check discount
    let discount = 0;
    if (couponCode) {
      const coupon = db.coupons.getByCode(couponCode);
      if (coupon && subtotal >= coupon.minOrderAmount) {
        discount = Math.round((subtotal * coupon.discountPercent) / 100);
        coupon.usageCount += 1;
      }
    }

    // Determine delivery fee
    const isDhaka = city?.toLowerCase().includes('dhaka') || city?.includes('ঢাকা');
    const isFree = subtotal >= settings.freeShippingThreshold;
    const deliveryFee = isFree ? 0 : isDhaka ? settings.deliveryDhaka : settings.deliveryOutside;

    const total = subtotal - discount + deliveryFee;
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `GB-2026-${randomNum}`;

    const newOrder: OrderDetails = {
      orderId,
      customerName,
      phone,
      email: email || 'N/A',
      address,
      city: city || (isDhaka ? 'ঢাকা মেট্রো' : 'ঢাকার বাইরে'),
      deliveryMethod: deliveryMethod || 'regular',
      paymentMethod: paymentMethod || 'cod',
      items: processedItems,
      subtotal,
      deliveryFee,
      discount,
      total,
      status: 'Pending',
      orderDate: new Date().toLocaleDateString('bn-BD', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      notes,
    };

    const saved = db.orders.create(newOrder);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: saved,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create order', error });
  }
};

// PATCH /api/orders/:orderId/status (Admin)
export const updateOrderStatus = (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Confirmed', 'Processing', 'Delivered', 'Cancelled'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const updated = db.orders.updateStatus(orderId, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, message: 'Order status updated', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update order status', error });
  }
};

// DELETE /api/orders/:orderId (Admin)
export const deleteOrder = (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const deleted = db.orders.delete(orderId);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete order', error });
  }
};

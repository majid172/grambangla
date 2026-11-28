import { Request, Response } from 'express';
import { db } from '../storage/db.js';

// GET /api/coupons (Admin)
export const getCoupons = (_req: Request, res: Response) => {
  try {
    const coupons = db.coupons.getAll();
    res.json({ success: true, count: coupons.length, data: coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch coupons', error });
  }
};

// POST /api/coupons/apply (Customer)
export const applyCoupon = (req: Request, res: Response) => {
  try {
    const { code, cartTotal } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: 'Coupon code is required' });
    }

    const coupon = db.coupons.getByCode(code);
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'কুপন কোডটি সঠিক নয় বা মেয়াদোত্তীর্ণ হয়েছে।' });
    }

    const amount = Number(cartTotal || 0);
    if (amount < coupon.minOrderAmount) {
      return res.status(400).json({
        success: false,
        message: `এই কুপনটি ব্যবহার করতে ন্যূনতম ৳${coupon.minOrderAmount} টাকার অর্ডার প্রয়োজন।`,
      });
    }

    const discountAmount = Math.round((amount * coupon.discountPercent) / 100);

    res.json({
      success: true,
      message: `কুপন সফলভাবে প্রয়োগ হয়েছে! (${coupon.discountPercent}% ছাড়)`,
      data: {
        code: coupon.code,
        discountPercent: coupon.discountPercent,
        discountAmount,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to apply coupon', error });
  }
};

// POST /api/coupons (Admin)
export const createCoupon = (req: Request, res: Response) => {
  try {
    const { code, discountPercent, minOrderAmount, expiryDate } = req.body;
    if (!code || !discountPercent) {
      return res.status(400).json({ success: false, message: 'Code and discountPercent are required' });
    }

    const newCoupon = {
      id: `cpn-${Date.now()}`,
      code: code.toUpperCase().trim(),
      discountPercent: Number(discountPercent),
      minOrderAmount: Number(minOrderAmount || 0),
      usageCount: 0,
      isActive: true,
      expiryDate: expiryDate || 'চলতি বছর (Active)',
    };

    const saved = db.coupons.create(newCoupon);
    res.status(201).json({ success: true, message: 'Coupon created successfully', data: saved });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create coupon', error });
  }
};

// DELETE /api/coupons/:id (Admin)
export const deleteCoupon = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = db.coupons.delete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }
    res.json({ success: true, message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete coupon', error });
  }
};

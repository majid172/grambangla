import { Router } from 'express';
import {
  getCoupons,
  applyCoupon,
  createCoupon,
  deleteCoupon,
} from '../controllers/coupon.controller.js';

const router = Router();

router.get('/', getCoupons);
router.post('/apply', applyCoupon);
router.post('/', createCoupon);
router.delete('/:id', deleteCoupon);

export default router;

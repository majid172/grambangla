import { Router } from 'express';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} from '../controllers/order.controller.js';

const router = Router();

router.get('/', getOrders);
router.get('/:orderId', getOrderById);
router.post('/', createOrder);
router.patch('/:orderId/status', updateOrderStatus);
router.delete('/:orderId', deleteOrder);

export default router;

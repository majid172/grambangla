import { Router } from 'express';
import {
  getCustomers,
  submitContactMessage,
  subscribeNewsletter,
} from '../controllers/contact.controller.js';

const router = Router();

router.get('/customers', getCustomers);
router.post('/contact', submitContactMessage);
router.post('/newsletter', subscribeNewsletter);

export default router;

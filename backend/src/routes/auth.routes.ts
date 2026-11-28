import { Router } from 'express';
import { adminLogin, getAdminProfile } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', adminLogin);
router.get('/me', getAdminProfile);

export default router;

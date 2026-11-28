import { Router } from 'express';
import {
  getProducts,
  getProductBySlugOrId,
  createProduct,
  updateProduct,
  updateProductStock,
  deleteProduct,
} from '../controllers/product.controller.js';

const router = Router();

router.get('/', getProducts);
router.get('/:slugOrId', getProductBySlugOrId);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.patch('/:id/stock', updateProductStock);
router.delete('/:id', deleteProduct);

export default router;

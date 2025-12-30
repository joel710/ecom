import express from 'express';
import { getProducts, getProductById, createProduct } from '../controllers/productController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', authenticateToken, createProduct);

export default router;

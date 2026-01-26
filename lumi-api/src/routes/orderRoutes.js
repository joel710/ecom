import express from 'express';
import { createOrder, getMyOrders } from '../controllers/orderController.js';
import { authenticateToken, optionalAuthenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', optionalAuthenticate, createOrder);
router.get('/me', authenticateToken, getMyOrders);

export default router;

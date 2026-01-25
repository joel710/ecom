import express from 'express';
import { getStats, getAllOrders, getAllUsers } from '../controllers/adminController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/stats', authenticateToken, getStats);
router.get('/orders', authenticateToken, getAllOrders);
router.get('/users', authenticateToken, getAllUsers);

export default router;

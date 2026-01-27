import express from 'express';
import { getStats, getAllOrders, getAllUsers } from '../controllers/adminController.js';
import { getConfig, updateConfig } from '../controllers/configController.js';
import { getCategories, createCategory, deleteCategory } from '../controllers/categoryController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/stats', authenticateToken, getStats);
router.get('/orders', authenticateToken, getAllOrders);
router.get('/users', authenticateToken, getAllUsers);

// Config routes
router.get('/config', authenticateToken, getConfig);
router.post('/config', authenticateToken, updateConfig);

// Category routes
router.get('/categories', authenticateToken, getCategories);
router.post('/categories', authenticateToken, createCategory);
router.delete('/categories/:id', authenticateToken, deleteCategory);

export default router;

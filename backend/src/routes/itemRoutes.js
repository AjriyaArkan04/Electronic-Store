const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/item.controller');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');

// Public routes - anyone can view items
// IMPORTANT: The specific route must come BEFORE the parameterized route
router.get('/:id', ItemController.getItemById);
router.get('/', ItemController.getAllItems);

// Admin only routes - create, update, delete items
router.post('/', authenticateToken, requireAdmin, ItemController.createItem);
router.put('/:id', authenticateToken, requireAdmin, ItemController.updateItem);
router.delete('/:id', authenticateToken, requireAdmin, ItemController.deleteItem);

module.exports = router;

const express = require('express');
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProducts);
router.get('/:id', productController.getProductById);

// Protected routes (require admin access)
router.post('/', authMiddleware.verifyToken, authMiddleware.isAdmin, productController.createProduct);
router.put('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, productController.updateProduct);
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, productController.deleteProduct);

module.exports = router;

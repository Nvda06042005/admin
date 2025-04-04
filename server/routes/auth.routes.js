const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.post('/login', authController.login);
router.post('/register', authController.register);

// Protected routes
router.get('/profile', authMiddleware.verifyToken, authController.profile);
router.post('/logout', authMiddleware.verifyToken, authController.logout);

module.exports = router;

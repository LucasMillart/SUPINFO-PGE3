const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { adminAuth } = require('../middleware/auth');

router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.delete('/:productId', adminAuth, cartController.removeFromCart);

module.exports = router;
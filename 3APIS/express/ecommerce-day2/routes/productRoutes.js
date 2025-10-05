const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { adminAuth } = require('../middleware/auth');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

router.post('/', adminAuth, productController.createProduct);
router.delete('/:id', adminAuth, productController.deleteProduct);
router.put('/:id', adminAuth, productController.updateProduct);

module.exports = router;
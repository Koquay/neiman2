const router = require('express').Router();
const productController = require('./product.controller');

router.get('/', productController.getProducts)
router.get('/:productId', productController.getProduct)
router.get('/search/1', productController.searchProducts)

module.exports = router;
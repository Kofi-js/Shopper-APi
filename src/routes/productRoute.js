const express = require('express');
const { createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { authIsVendor } = require('../utils/verifyToken');
// express init
const ProductRouter = express.Router();

// routes
ProductRouter.post('/api/products/add', authIsVendor, createProduct);
ProductRouter.put('/api/products/:id', authIsVendor, updateProduct);
ProductRouter.delete('/api/products/:id', authIsVendor, deleteProduct);

module.exports = ProductRouter;

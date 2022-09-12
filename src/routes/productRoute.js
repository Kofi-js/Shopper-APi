const express = require('express');
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require('../controllers/productController');
const { authIsVendor } = require('../utils/verifyToken');
// express init
const ProductRouter = express.Router();

// routes
ProductRouter.post('/api/products/add', authIsVendor, createProduct);
ProductRouter.put('/api/products/:id', authIsVendor, updateProduct);
ProductRouter.delete('/api/products/:id', authIsVendor, deleteProduct);
ProductRouter.get('/api/products/find/:id', authIsVendor, getProduct);
ProductRouter.get('/api/products', authIsVendor, getAllProducts);

module.exports = ProductRouter;

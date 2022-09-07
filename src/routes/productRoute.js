const express = require('express');
const { createProduct, updateProduct } = require('../controllers/productController');
const { isAdmin, isVendor, isAuth } = require('../utils/verifyToken');
// express init
const ProductRouter = express.Router();

// routes
ProductRouter.post('/', isVendor, createProduct);
ProductRouter.put('/:id', isVendor, updateProduct);
module.exports = ProductRouter;

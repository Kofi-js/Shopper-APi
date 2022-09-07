const express = require('express');
const { createProduct } = require('../controllers/productController');
const { isAdmin, isVendor, isAuth } = require('../utils/verifyToken');
// express init
const ProductRouter = express.Router();

// routes
ProductRouter.post('/', isVendor, createProduct);

module.exports = ProductRouter;

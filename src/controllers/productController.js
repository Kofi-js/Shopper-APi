/* eslint-disable semi */
const Product = require('../models/Product');

// create Product
async function createProduct(req, res) {
  const newProduct = new Product(req.body);
  try {
    const saveProduct = await newProduct.save();
    res.status(200).json(saveProduct)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = {
  createProduct,
}

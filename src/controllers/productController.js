/* eslint-disable space-before-blocks */
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

// Update Product
async function updateProduct(req, res){
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }, { new: true });
    res.status(200).json(updatedProduct);
  } catch (err){
    res.status(500).json(err);
  }
}

module.exports = {
  createProduct,
  updateProduct,
}

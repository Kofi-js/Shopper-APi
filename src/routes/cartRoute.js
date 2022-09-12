const Cartrouter = require('express').Router();
const cartController = require('../controllers/cartController');

Cartrouter.post('/api/auth/add-cart', cartController.addItemToCart);
Cartrouter.get('/api/auth/get-cart', cartController.getCart);
Cartrouter.delete('/empty-cart', cartController.emptyCart);
module.exports = Cartrouter;

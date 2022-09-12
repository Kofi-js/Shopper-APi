/* eslint-disable operator-linebreak */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const cartRepository = require('../respository/cartRespository');

const productController = require('./productController');

exports.addItemToCart = async (req, res) => {
  const { productId } = req.body;
  const quantity = Number.parseInt(req.body.quantity, 10);
  try {
    let cart = await cartRepository.cart();
    const productDetails = await productController.findById(productId);
    if (!productDetails) {
      return res.status(500).json({
        type: 'Not Found',
        msg: 'Invalid request',
      });
    }
    // Check if cart exists
    if (cart) {
      // check if index exists
      const indexFound = cart.items.findIndex(
        (item) => item.productId.id === productId,
      );

      if (indexFound !== -1 && quantity <= 0) {
        cart.items.splice(indexFound, 1);
        if (cart.items.length === 0) {
          cart.subTotal = 0;
        } else {
          cart.subTotal = cart.items
            .map((item) => item.total)
            .reduce((acc, next) => acc + next);
        }
      } else if (indexFound !== -1) {
        cart.items[indexFound].quantity +=
          cart.items[indexFound].quantity + quantity;
        cart.items[indexFound].total =
          cart.items[indexFound].quantity * productDetails.price;
        cart.items[indexFound].price = productDetails.price;
        cart.subTotal = cart.items
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);
      } else if (quantity > 0) {
        cart.items.push({
          productId,
          quantity,
          price: productDetails.price,
          total: parseInt(productDetails.price * quantity, 10),
        });
        cart.subTotal = cart.items
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);
      } else {
        return res.status(400).json({
          type: 'Invalid',
          msg: 'Invalid request',
        });
      }
      const data = await cart.save();
      res.status(200).json({
        type: 'success',
        mgs: 'Process Successful',
        data,
      });
    } else {
      const cartData = {
        items: [
          {
            productId,
            quantity,
            total: parseInt(productDetails.price * quantity, 10),
            price: productDetails.price,
          },
        ],
        subTotal: parseInt(productDetails.price * quantity, 10),
      };
      cart = await cartRepository.addItem(cartData);
      res.json(cart);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: 'Invalid',
      msg: 'Something Went Wrong',
      err,
    });
  }
};
exports.getCart = async (req, res) => {
  try {
    const cart = await cartRepository.cart();
    if (!cart) {
      return res.status(400).json({
        type: 'Invalid',
        msg: 'Cart Not Found',
      });
    }
    res.status(200).json({
      status: true,
      data: cart,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: 'Invalid',
      msg: 'Something Went Wrong',
      err,
    });
  }
};

exports.emptyCart = async (req, res) => {
  try {
    const cart = await cartRepository.cart();
    cart.items = [];
    cart.subTotal = 0;
    const data = await cart.save();
    res.status(200).json({
      type: 'success',
      mgs: 'Cart Has been emptied',
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: 'Invalid',
      msg: 'Something Went Wrong',
      err,
    });
  }
};

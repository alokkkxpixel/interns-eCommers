const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');
const { getCart } = require('../controller/cart.controller');

// GET cart with total
router.get('/', auth, getCart);

// ADD to cart
router.post('/', auth, [
  body('productId').notEmpty(),
  body('quantity').isInt({ min: 1 })
], );

// REMOVE from cart
router.delete('/:itemId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
    await cart.save();
    
    res.json({ message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CHECKOUT - Mock receipt
router.post('/checkout', auth, [
  body('name').notEmpty(),
  body('email').isEmail()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const cart = await Cart.findOne({ user: req.userId }).populate('items.product');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const total = cart.items.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    const receipt = {
      orderId: `ORD-${Date.now()}`,
      customer: {
        name: req.body.name,
        email: req.body.email
      },
      items: cart.items.map(item => ({
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        subtotal: item.product.price * item.quantity
      })),
      total,
      timestamp: new Date().toISOString()
    };

    // Clear cart after checkout
    cart.items = [];
    await cart.save();

    res.json(receipt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
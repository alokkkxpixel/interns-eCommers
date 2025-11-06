const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');
const { getCart, removeFromCart, mockRecipt, addToCart } = require('../controller/cart.controller');

// GET cart with total
router.get('/', auth, getCart);

// ADD to cart
router.post('/', auth, [
  body('productId').notEmpty(),
  body('quantity').isInt({ min: 1 })
], addToCart);

// REMOVE from cart
router.delete('/:itemId', auth,removeFromCart);

// CHECKOUT - Mock receipt
router.post('/checkout', auth, [
  body('name').notEmpty(),
  body('email').isEmail()
],mockRecipt);

module.exports = router;
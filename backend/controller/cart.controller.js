const { validationResult } = require("express-validator");
const Cart = require("../models/Cart");

module.exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.userId }).populate('items.product');
    
    if (!cart) {
      return res.json({ items: [], total: 0 });
    }

    const total = cart.items.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    res.json({ items: cart.items, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports.addToCart = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { productId, quantity } = req.body;
    
    let cart = await Cart.findOne({ user: req.userId });
    
    if (!cart) {
      cart = new Cart({ user: req.userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    await cart.populate('items.product');
    
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
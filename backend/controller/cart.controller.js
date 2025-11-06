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
    
    res.json({message:"item added to cart"},cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports.removeFromCart =  async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
    await cart.save();
    
    res.json({ message: 'Item removed',cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports.mockRecipt =  async (req, res) => {
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
}
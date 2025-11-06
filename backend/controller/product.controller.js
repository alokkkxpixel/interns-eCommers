const { validationResult } = require("express-validator");
const Product = require("../models/Product");

module.exports.getItems = async (req, res) => {
  try {
    
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports.createProducts = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {name,price } = req.body
  try {
    const product = await Product.create({
      name,
      price,
      createdBy: req.userId
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
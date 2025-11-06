const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const { getItems, createProducts } = require('../controller/product.controller');

// GET all products
router.get('/', getItems);

// CREATE product (protected - only logged in users)
router.post('/', auth, [
  body('name').notEmpty().withMessage("product name is required"),
  body('price').isFloat({ min: 0 }).withMessage("product price is required"),,
  body("description").isString().notEmpty().withMessage("product description is required"),
], createProducts);

module.exports = router;
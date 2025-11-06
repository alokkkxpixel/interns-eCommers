const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerUser, login } = require('../controller/auth.controller');

// Register
router.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('name').notEmpty()
],registerUser)
// Login
router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], login);

module.exports = router;
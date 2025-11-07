const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerUser, login } = require('../controller/auth.controller');
const auth = require('../middleware/auth');

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


router.get('/verify-token',auth , (req,res)=>{
  res.json({message:"token is vaild", userId: req.userId})
})

router.get('/', (req,res)=> {res.send("hello")})
module.exports = router;
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  (req, res) => {
    res.json({ msg: 'Register user' });
  }
);

// @route   POST api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  (req, res) => {
    res.json({ msg: 'Login user' });
  }
);

// @route   GET api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', (req, res) => {
  res.json({ msg: 'Get user profile' });
});

module.exports = router;
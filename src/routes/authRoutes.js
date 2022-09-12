/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
const express = require('express');

const Authrouter = express.Router();
const { check } = require('express-validator');

const { authenticateUser } = require('../middleware/auth');

// import auth controller
const authController = require('../controllers/authControllers');

// User signup
Authrouter.post(
  '/api/auth/signup',
  [
    check('fullname', 'full name is required').exists(),
    check('username', 'user name is required').exists(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'A valid password is required').exists(),
  ],
  authController.registerUser,
);

// User Login
Authrouter.post(
  '/api/auth/login',
  [
    check('username', 'Please enter your username').exists(),
    check('password', 'A valid password is required').exists(),
  ],
  authController.loginUser,
);

// User logout
Authrouter.put('/api/auth/logout', authenticateUser, authController.logoutUser);

module.exports = Authrouter;

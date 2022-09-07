/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
const express = require('express');

const Authrouter = express.Router();
const { check } = require('express-validator');

const {
  authenticateUser,
  checkIfAdmin,
  checkIfVendor,
} = require('../middleware/auth');

// import users controller
const usersController = require('../controllers/authControllers');

// User signup
Authrouter.post(
  '/api/auth/signup',
  [
    check('fullname', 'full name is required').exists(),
    check('username', 'user name is required').exists(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'A valid password is required').exists(),
  ],
  usersController.registerUser,
);

// User Login
Authrouter.post(
  '/api/auth/login',
  [
    check('username', 'Please enter your username').exists(),
    check('password', 'A valid password is required').exists(),
  ],
  usersController.loginUser,
);

// User logout
Authrouter.put('/api/auth/logout', authenticateUser, usersController.logoutUser);

// // Recover password
// Authrouter.post(
//   '/api/auth/recover-password',
//   [check('email', 'Please enter a valid email').isEmail()],
//   usersController.recoverPassword
// );

// // accept password change
// Authrouter.put('/api/auth/change-password?', usersController.changePassword);

// update user
// Authrouter.put(
//   '/api/user/:user_id/update',
//   authenticateUser,
//   checkIfAdmin,
//   checkIfVendor,
//   usersController.updateUser,
// );

// delete user
Authrouter.delete(
  '/api/user/:user_id/delete',
  authenticateUser,
  checkIfAdmin,
  checkIfVendor,
  usersController.deleteUser,
);
module.exports = Authrouter;

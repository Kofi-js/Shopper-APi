/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
const express = require('express');

const router = express.Router();
const { check } = require('express-validator');

const {
  authenticateUser,
  checkIfAdmin,
  checkIfVendor,
} = require('../middleware/auth');

// import users controller
const usersController = require('../controllers/usersController');

// User signup
router.post(
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
router.post(
  '/api/auth/login',
  [
    check('username', 'Please enter your username').exists(),
    check('password', 'A valid password is required').exists(),
  ],
  usersController.loginUser,
);

// User logout
router.put('/api/auth/logout', authenticateUser, usersController.logoutUser);

// // Recover password
// router.post(
//   '/api/auth/recover-password',
//   [check('email', 'Please enter a valid email').isEmail()],
//   usersController.recoverPassword
// );

// // accept password change
// router.put('/api/auth/change-password?', usersController.changePassword);

// update user
// router.put(
//   '/api/user/:user_id/update',
//   authenticateUser,
//   checkIfAdmin,
//   checkIfVendor,
//   usersController.updateUser,
// );

// delete user
router.delete(
  '/api/user/:user_id/delete',
  authenticateUser,
  checkIfAdmin,
  checkIfVendor,
  usersController.deleteUser,
);
module.exports = router;

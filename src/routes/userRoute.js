const express = require('express');

const Userrouter = express.Router();

// import user controller
const usersController = require('../controllers/usersController');
const {
  authenticateUser,
  checkIfAdmin,
  checkIfVendor,
} = require('../middleware/auth');

// update user
Userrouter.put(
  '/api/user/:user_id/update',
  authenticateUser,
  checkIfAdmin,
  checkIfVendor,
  usersController.updateUser,
);

// delete user
Userrouter.delete(
  '/api/user/:user_id/delete',
  authenticateUser,
  checkIfAdmin,
  checkIfVendor,
  usersController.deleteUser,
);

// get one user
Userrouter.get(
  '/api/user/:user_id',
  authenticateUser,
  checkIfAdmin,
  checkIfVendor,
  usersController.getUser,
);

// get all users
Userrouter.get(
  '/api/users',
  authenticateUser,
  checkIfAdmin,
  checkIfVendor,
  usersController.getAllUsers,
);

module.exports = Userrouter;

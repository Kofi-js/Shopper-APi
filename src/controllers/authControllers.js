/* eslint-disable object-curly-newline */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
require('dotenv').config();

const { SECRET } = process.env;

// @route  POST api/auth/signup
exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, username, email, password } = req.body;

  try {
    // check for existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    // else...
    const salt = await bcrypt.genSalt(10);

    // Hash user password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    // jwt auth
    jwt.sign(
      {
        id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        email: newUser.email,
        userRole: newUser.userRole,
        isAdmin: newUser.isAdmin,
        isVendor: newUser.isVendor,
      },
      SECRET,
      {
        expiresIn: 60,
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          statusCode: 200,
          message: 'Account created successfully',
          user: {
            fullname: newUser.fullname,
            username: newUser.username,
            email: newUser.email,
            userRole: newUser.userRole,
            isAdmin: newUser.isAdmin,
            isVendor: newUser.isVendor,
          },
          token,
        });
      },
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route POST api/auth/login
exports.loginUser = async (req, res) => {
  // check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // else
  // destructure request body
  const { username, password } = req.body;

  try {
    // Initialize user
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Invalid credentials',
      });
    }

    // else...
    const isMatch = await bcrypt.compare(password, user.password);
    // Check password
    if (!isMatch) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Invalid credentials',
      });
    }

    // else

    const payload = {
      user: {
        id: user._id,
        username: user.userame,
        password: user.password,
        userRole: user.userRole,
        isAdmin: user.isAdmin,
        isVendor: user.isVendor,
      },
    };

    jwt.sign(
      payload,
      SECRET,
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          statusCode: 200,
          message: 'logged in successfully',
          user: {
            userame: user.username,
            password: user.password,
            userRole: user.userRole,
          },
          token,
        });
      },
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route  PUT api/auth/logout
exports.logoutUser = async (req, res) => {
  const splittedHeader = req.header('Authorization').split(' ');
  if (splittedHeader[0] !== 'Bearer') {
    return res.status(401).json({
      statusCode: 401,
      message: 'authorization format is Bearer <token>',
    });
  }

  jwt.sign(splittedHeader[1], '', { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      console.log(logout);
      res.send({ msg: 'You have logged out successfully' });
    } else {
      console.error(err);
      res.send({ msg: 'Error' });
    }
  });
};

// @route  POST api/auth/password-recovery

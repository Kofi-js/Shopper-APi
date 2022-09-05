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
          message: 'user created successfully',
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
  const { email, password } = req.body;

  try {
    // Initialize user
    const user = await User.findOne({ email });

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
        email: user.email,
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
          message: 'user logged in successfully',
          user: {
            userame: user.userame,
            email: user.email,
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

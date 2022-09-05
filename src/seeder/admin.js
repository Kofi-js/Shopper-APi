/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.seedAdmin = async () => {
  try {
    // Check if there's an existing admin account
    const adminExists = await User.findOne({ userRole: 'admin' });
    if (adminExists) return 'admin account already exists';

    // hash user password
    const salt = await bcrypt.genSalt(10);
    const password = 'admin1234';

    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await User.create({
      fullname: 'Kofi Oghenevwegba',
      username: 'HoozierD4ddy',
      email: 'vwegbakofi@gmail.com',
      userRole: 'admin',
      password: hashedPassword,
      isAdmin: true,
      isVendor: false,
    });

    return 'new admin created successfully';
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

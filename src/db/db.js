/* eslint-disable no-console */
// Database connection
const mongoose = require('mongoose');
require('dotenv').config();

const { MONGO_URL } = process.env;

const connectDB = () => {
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('MongoDB connected...');
    })
    .catch((err) => {
      console.log(err.message);
      process.exit(1);
    });
};

module.exports = connectDB;

/* eslint-disable no-console */
const express = require('express');
const debug = require('debug');
const { json } = require('express');

const ProductRouter = require('./routes/productRoute');
const Authrouter = require('./routes/authRoutes');
require('dotenv').config();

// initialize express
const app = express();
debug(express);

// initialize middleware
app.use(json());

// connect to routes
app.use('/api/auth', Authrouter);
app.use('/api/products', ProductRouter);

module.exports = app;

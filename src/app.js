/* eslint-disable no-console */
const express = require('express');
const debug = require('debug');
const { json } = require('express');

const ProductRouter = require('./routes/productRoute');
const Authrouter = require('./routes/authRoutes');
const Userrouter = require('./routes/userRoute');
const Cartrouter = require('./routes/cartRoute');
require('dotenv').config();

// initialize express
const app = express();
debug(express);

// initialize middleware
app.use(json());

// connect to routes
app.use('/', Authrouter);
app.use('/', ProductRouter);
app.use('/', Userrouter);
app.use('/', Cartrouter);

module.exports = app;

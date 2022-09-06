/* eslint-disable no-console */
const express = require('express');
const debug = require('debug');
const { json } = require('express');
const connectDB = require('./db/db');
const routes = require('./routes/userRoutes');
require('dotenv').config();

connectDB();

// initialize express
const app = express();
debug(express);

// initialize middleware
app.use(json());

// connect to routes
app.use('/', routes);

module.exports = app;

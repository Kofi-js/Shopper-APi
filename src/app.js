const express = require('express');
const debug = require('debug');

const app = express.Router();
debug(express);

module.exports = app;

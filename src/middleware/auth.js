/* eslint-disable consistent-return */
/* eslint-disable camelcase */
// This middleware checks if there's a token and header
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { SECRET } = process.env;

exports.authenticateUser = (req, res, next) => {
  // get token from header
  const authorization_token = req.header('Authorization'); // or Authorization //x-auth-token

  // check if tokeen doesn't exist
  if (!authorization_token) {
    return res.status(401).json({
      statusCode: 401,
      message: 'No token, authorization denied!',
    });
  }

  // check if token conntains Bearer
  const splittedHeader = req.header('Authorization').split(' ');
  if (splittedHeader[0] !== 'Bearer') {
    return res.status(401).json({
      statusCode: 401,
      message: 'authorization format is Bearer <token>',
    });
  }

  // else... token exists
  try {
    const token = splittedHeader[1];
    const decoded = jwt.verify(token, SECRET);

    // assign user to request object
    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({
      statusCode: 401,
      message: 'Token is invalid!',
    });
  }
};

exports.checkIfAdmin = (req, res, next) => {
  if (req.user.userRole !== 'admin' && req.user.isAdmin !== true) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Route restricted to admin',
    });
  }

  return next();
};

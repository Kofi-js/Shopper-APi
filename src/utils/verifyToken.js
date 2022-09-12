/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.token;
//   console.log(authHeader);
//   if (authHeader) {
//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, process.env.SECRET, (err, user) => {
//       if (err) res.status(403).json('Token is not valid');
//       console.log(user);
//       req.user = user;
//       next();
//     });
//   } else {
//     return res.status(401).json('You are not authenticated');
//   }
// };
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.token;
  try {
    if (!authHeader) {
      return res.status(404).json({ message: 'token not provided' });
    }
    jwt.verify(authHeader, process.env.SECRET, (err, user) => {
      if (err) {
        return res
          .status(400)
          .json({ message: 'something went wong', error: err });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(401).json({ message: 'unknown error', error: err });
  }
};
const isAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isVendor) {
      next();
    } else {
      res.status(403).json('You are  not authorized 1');
    }
  });
};
const authIsVendor = (req, res, next) => {
  verifyToken(req, res, () => {
    const { isVendor } = req.user.user;
    if (isVendor) {
      next();
    } else {
      res.status(403).json('You are not authorized 2');
    }
  });
};

const authIsAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    const { isAdmin } = req.user.user;
    if (isAdmin) {
      next();
    } else {
      res.status(403).json('You are not authorized 3');
    }
  });
};

module.exports = {
  verifyToken,
  isAuth,
  authIsAdmin,
  authIsVendor,
};

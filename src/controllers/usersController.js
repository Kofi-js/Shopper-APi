const User = require('../models/userModel');

// @route       PUT api/user/:user_id/update
exports.updateUser = (req, res) => {
  User.updateOne(
    {
      _id: req.params.user_id,
    },
    {
      $set: {
        userRole: req.body.userRole,
        isAdmin: req.body.isAdmin,
      },
    },
  ).then((data) => {
    res
      .status(201)
      .json({ statusCode: 201, message: 'Role assigned successfully', data });
  });
};

// @route       DELETE api/user/:user_id/delete
exports.deleteUser = (req, res) => {
  User.deleteOne({
    _id: req.params.user_id,
  }).then(() => {
    res.status(200).json({
      statusCode: 200,
      message: 'user deleted successfully',
    });
  });
};

// @route       GET api/user/:user_id
exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.user_id,
    }).select('-password');

    res
      .status(200)
      .json({ statusCode: 200, message: 'user fetched successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route       GET api/users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ users });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

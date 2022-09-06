const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    //  properties of the user
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // image would be changed from dashboard
    profileImg: {
      type: String,
      required: false,
    },
    password: {
      type: String,
    },
    userRole: {
      type: String,
      enum: ['admin', 'vendor', 'user'],
      default: 'user',
    },
    isAdmin: {
      type: Boolean,
      default: 0,
    },
    isVendor: {
      type: Boolean,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', UserSchema);

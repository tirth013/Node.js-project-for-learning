const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add the user name'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'please add email'],
    },
    password: {
      type: String,
      required: [true, 'please add password'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('user', userSchema);
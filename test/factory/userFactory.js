
const uuid = require('uuid');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports =  (name) => {
  return new User({}).save();

}
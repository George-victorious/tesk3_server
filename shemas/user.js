const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: false,
    default: new Date().getTime()
  },
  gender: {
    type: Number,
    required: false,
    unique: false,
    default: 0
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    unique: false
  },
  middleName: {
    type: String,
    required: true,
    unique: false
  },
  lastName: {
    type: String,
    required: true,
    unique: false
  },
  phone: {
    type: String,
    required: false,
    unique: false
  },
  password: {
    type: String,
    required: true,
    unique: false
  },
  role: {
    type: String,
    required: true,
    unique: false,
    default: 'user'
  },
});

module.exports = userSchema;
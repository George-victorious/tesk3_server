const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  id: {
    type: Number,
    required: false,
    unique: true
  },
  userId: {
    type: Number,
    required: true,
    unique: false
  },
  status: {
    type: Number,
    required: false,
    unique: false,
    default: 0,
  },
  created: {
    type: Number,
    required: false,
    unique: false
  },
  deleveredAt: {
    type: Number,
    required: true,
    unique: false,
    default: 0
  },
  productName: {
    type: String,
    required: true,
    unique: false
  },
  price: {
    type: Number,
    required: true,
    unique: false
  },
  description: {
    type: String,
    required: true,
    unique: false
  },
  deleveredTo: {
    type: Object,
    required: true,
    unique: false
  },
  deleveredFrom: {
    type: Object,
    required: true,
    unique: false
  },
});

module.exports = orderSchema;
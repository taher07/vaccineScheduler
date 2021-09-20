const mongoose = require('mongoose')
const { Schema } = mongoose

const userModel = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  pinCode: {
    type: Number,
    required: true
  },
  uid: {
    type: String,
    required: true
  },
  isPartiallyVaccinated: {
    type: Boolean,
    required: true,
    default: false
  },
  isVaccinated: {
    type: Boolean,
    required: true,
    default: false
  },
  isCancelled: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userModel)
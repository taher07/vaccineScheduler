const mongoose = require('mongoose')
const { Schema } = mongoose

const vaccineTypeModel = new Schema({
  brand: {
    type: String,
    required: true
  },
  jabsRequired: {
    type: Number,
    required: true
  },
  waitTime: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('VaccineType', vaccineTypeModel)
const mongoose = require('mongoose')
const { Schema } = mongoose

const clusterModel = new Schema({
  location: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  pinCodes: {
    type: [String],
    required: true
  },
  managerID: {
    type: Schema.Types.ObjectId,
    ref: 'Staff',
    required: true
  },
  populationDensity: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Cluster', clusterModel)
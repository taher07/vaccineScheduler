const mongoose = require('mongoose')
const { Schema } = mongoose

const vaccineBatchModel = new Schema({
  vaccineTypeID: {
    type: Schema.Types.ObjectId,
    ref: 'VaccineType',
    required: true
  },
  clusterID: {
    type: Schema.Types.ObjectId,
    ref: 'Cluster',
    required: true
  },
  ageGroup: {
    type: String,
    required: true,
    enum: ["Kid", "Adult", "Elderly"]
  },
  dateOfAllotment: {
    type: Date,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  remaining: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('VaccineBatch', vaccineBatchModel)
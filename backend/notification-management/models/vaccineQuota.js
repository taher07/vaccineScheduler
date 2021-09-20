const mongoose = require('mongoose')
const { Schema } = mongoose

const vaccineQuotaModel = new Schema({
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
  quota: {
    type: Number,
    required: true
  },
  ageGroup: {
    type: String,
    required: true,
    enum: ["Kid", "Adult", "Elderly"]
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('VaccineQuota', vaccineQuotaModel)
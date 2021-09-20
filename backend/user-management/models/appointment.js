const mongoose = require('mongoose')
const { Schema } = mongoose

const appointmentModel = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  clusterID: {
    type: Schema.Types.ObjectId,
    ref: 'Cluster',
    required: true
  },
  vaccineBatchID: {
    type: Schema.Types.ObjectId,
    ref: 'VaccineBatch',
    required: true
  },
  dateOfAppointment: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Registered", "Terminated", "Completed"],
    default: "Pending"
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Appointment', appointmentModel)
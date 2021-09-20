const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

const staffModel = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
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
  clusterID: {
    type: Schema.Types.ObjectId,
    ref: 'Cluster',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ["Administrator", "Moderator", "Controller", "Manager", "Paramedic", "Clerk"],
    default: "Clerk"
  }
}, {
  timestamps: true
})

staffModel.pre('save', async (next) => {
  const staff = this
  if (staff.isModified("password"))
    staff.password = await bcrypt.hash(staff.password, 8)
  next()
})

module.exports = mongoose.model('Staff', staffModel)
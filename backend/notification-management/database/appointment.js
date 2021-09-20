const Appointment = require('../models/appointment')
const { logger } = require('../utils')

class AppointmentDB {
  create = (payload) => {
    const appointment = new Appointment()
    return appointment.save(payload)
      .then(savedData => savedData)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  fetchByID = (id) => {
    return Appointment.findById(id)
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  fetchAll = () => {
    return Appointment.find()
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  fetchByUserID = (id) => {
    return Appointment.find({ userID: id })
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  fetchAllUnattended = () => {
    return Appointment.find({
      $and: [
        { dateOfAppointment: { $lt: new Date() } },
        { status: "Pending" },
      ]
    })
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  fetchAllAttended = () => {
    return Appointment.find({ status: "Completed" })
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  fetchAllRegistered = () => {
    return Appointment.find({ status: "Registered" })
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  update = (id, payload) => {
    return Appointment.findByIdAndUpdate(id, payload)
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  delete = (id) => {
    return Appointment.findByIdAndDelete(id)
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
}

module.exports = AppointmentDB
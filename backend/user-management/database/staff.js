const Staff = require('../models/staff')
const { logger } = require('../utils')

class StaffDB {
  create = (payload) => {
    const staff = new Staff()
    return staff.save(payload)
      .then(savedData => savedData)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  fetchByID = (id) => {
    return Staff.findById(id)
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  fetchAll = () => {
    return Staff.find()
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  fetchByEmailAndPassword = (email, password) => {
    return Staff.find({ email, password })
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  update = (id, payload) => {
    return Staff.findByIdAndUpdate(id, payload)
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  delete = (id) => {
    return Staff.findByIdAndDelete(id)
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
}

module.exports = StaffDB
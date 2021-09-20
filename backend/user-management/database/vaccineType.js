const VaccineType = require('../models/vaccineType')
const { logger } = require('../utils')

class VaccineTypeDB {
  create = (payload) => {
    const vaccineType = new VaccineType()
    return vaccineType.save(payload)
      .then(savedData => savedData)
      .catch(err => {
        logger.error(err.message)
        return false
      })
  };
  fetchByID = (id) => {
    return VaccineType.findById(id)
      .then(data => data)
      .catch(err => {
        logger.error(err.message)
        return false
      })
  };
  fetchAll = () => {
    return VaccineType.find()
      .then(data => data)
      .catch(err => {
        logger.error(err.message)
        return false
      })
  };
  update = (id, payload) => {
    return VaccineType.findByIdAndUpdate(id, payload)
      .then(data => data)
      .catch(err => {
        logger.error(err.message)
        return false
      })
  };
  delete = (id) => {
    return VaccineType.findByIdAndDelete(id)
      .then(data => data)
      .catch(err => {
        logger.error(err.message)
        return false
      })
  };
}

module.exports = VaccineTypeDB
const VaccineBatch = require('../models/vaccineBatch')
const { logger } = require('../utils')

class VaccineBatchDB {
  create = (payload) => {
    const vaccineBatch = new VaccineBatch()
    return vaccineBatch.save(payload)
      .then(savedData => savedData)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  fetchByID = (id) => {
    return VaccineBatch.findById(id)
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  fetchAll = () => {
    return VaccineBatch.find()
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  update = (id, payload) => {
    return VaccineBatch.findByIdAndUpdate(id, payload)
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  delete = (id) => {
    return VaccineBatch.findByIdAndDelete(id)
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
}

module.exports = VaccineBatchDB
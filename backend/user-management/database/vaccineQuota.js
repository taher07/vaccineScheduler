const VaccineQuota = require('../models/vaccineQuota')
const { logger } = require('../utils')

class VaccineQuotaDB {
  create = (payload) => {
    const vaccineQuota = new VaccineQuota()
    return vaccineQuota.save(payload)
      .then(savedData => savedData)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  fetchByID = (id) => {
    return VaccineQuota.findById(id)
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  fetchAll = () => {
    return VaccineQuota.find()
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  update = (id, payload) => {
    return VaccineQuota.findByIdAndUpdate(id, payload)
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  delete = (id) => {
    return VaccineQuota.findByIdAndDelete(id)
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  fetchByClusterID = (id) => {
    return VaccineQuota.find({
      clusterID: id
    })
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  }
}

module.exports = VaccineQuotaDB
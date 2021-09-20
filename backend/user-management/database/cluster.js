const Cluster = require('../models/cluster')
const { logger } = require('../utils')

class ClusterDB {
  create = (payload) => {
    const cluster = new Cluster()
    return cluster.save(payload)
      .then(savedData => savedData)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  fetchByID = (id) => {
    return Cluster.findById(id)
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  fetchAll = () => {
    return Cluster.find()
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  update = (id, payload) => {
    return Cluster.findByIdAndUpdate(id, payload)
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  delete = (id) => {
    return Cluster.findByIdAndDelete(id)
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
}

module.exports = ClusterDB
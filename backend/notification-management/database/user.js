const User = require('../models/user')
const { logger } = require('../utils')

class UserDB {
  create = (payload) => {
    const user = new User()
    return user.save(payload)
      .then(savedData => savedData)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  fetchByID = (id) => {
    return User.findById(id)
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  fetchPincodeByID = (id) => {
    return User.findById(id)
      .then(data => data.pinCode)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  fetchAll = () => {
    return User.find()
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  update = (id, payload) => {
    return User.findByIdAndUpdate(id, payload)
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
  delete = (id) => {
    return User.findByIdAndDelete(id)
      .then(data => data)
      .catch(err => {
        logger.error(err);
        return false
      })
  };
}

module.exports = UserDB
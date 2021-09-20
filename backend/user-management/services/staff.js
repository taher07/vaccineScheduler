const jwt = require('jsonwebtoken')
const randtoken = require('rand-token')
const { secretKey } = require('../config')
const { logger } = require('../utils')
const VaccineTypeDB = require('../database/vaccineType')
const VaccineBatchDB = require('../database/vaccineBatch')
const VaccineQuotaDB = require('../database/vaccineQuota')
const ClusterDB = require('../database/cluster')
const UserDB = require('../database/user')
const StaffDB = require('../database/staff')
const AppointmentDB = require('../database/appointment')

let refreshTokens = {}

exports.signIn = (email, password) => {
  const manager = new StaffDB()
  const res = manager.fetchByEmailAndPassword(email, password)

  if (res) {
    const accessToken = jwt.sign(res._id, secretKey, { expiresIn: 300 })
    const refreshToken = randtoken.generate(256)

    return { accessToken, refreshToken }
  }
  else return false
}

exports.getToken = (refreshToken) => {
  if ((refreshToken in refreshTokens) && (req.staff._id === refreshTokens[refreshToken])) {
    const accessToken = jwt.sign(req.staff._id, secretKey, { expiresIn: 300 })
    return accessToken;
  }
  else return false;
}

// TASK: VACCINE TYPE
exports.getAllVaccineTypes = () => {
  try {
    const manager = new VaccineTypeDB()
    const data = manager.fetchAll()

    if (!data)
      throw "No data found!"
    else
      return data
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.getVaccineType = (id) => {
  try {
    const manager = new VaccineTypeDB()
    const data = manager.fetchByID(id)

    if (!data)
      throw "No data found!"
    else
      return data
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.addVaccineType = (data) => {
  try {
    const { brand, jabsRequired, waitTime } = data

    if (!brand || !jabsRequired || !waitTime) throw "Incorrect arguments specified!"

    const manager = new VaccineTypeDB()
    const result = manager.create({ brand, jabsRequired, waitTime })

    return result ? true : false
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.updateVaccineType = (id, data) => {
  try {
    const { brand, jabsRequired, waitTime } = data

    if (!brand || !jabsRequired || !waitTime) throw "Incorrect arguments specified!"

    const manager = new VaccineTypeDB()
    const result = manager.update(id, { brand, jabsRequired, waitTime })

    return result ? true : false
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.deleteVaccineType = (id) => {
  try {
    const manager = new VaccineTypeDB()
    const result = manager.delete(id)

    return result ? true : false
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

// TASK: VACCINE BATCH
exports.getAllVaccineBatches = () => {
  try {
    const manager = new VaccineBatchDB()
    const data = manager.fetchAll()

    if (!data)
      throw "No data found!"
    else
      return data
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.getVaccineBatch = (id) => {
  try {
    const manager = new VaccineBatchDB()
    const data = manager.fetchByID(id)

    if (!data)
      throw "No data found!"
    else
      return data
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.addVaccineBatch = (data) => {
  try {
    const { vaccineTypeID, clusterID, ageGroup, quantity } = data
    const dateOfAllotment = new Date()
    const remaining = quantity

    if (!vaccineTypeID || !clusterID || !ageGroup || !quantity || dateOfAllotment || !remaining) throw "Incorrect arguments specified!"

    const manager = new VaccineBatchDB()
    const result = manager.create({ vaccineTypeID, clusterID, ageGroup, quantity, dateOfAllotment, remaining })

    if (!result)
      throw "No data found!"
    else
      return result
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.updateVaccineBatch = (id, data) => {
  try {
    const { vaccineTypeID, clusterID, ageGroup, quantity } = data
    const dateOfAllotment = new Date()
    const remaining = quantity

    if (!vaccineTypeID || !clusterID || !ageGroup || !quantity || dateOfAllotment || !remaining) throw "Incorrect arguments specified!"

    const manager = new VaccineBatchDB()
    const result = manager.update(id, { vaccineTypeID, clusterID, ageGroup, quantity, dateOfAllotment, remaining })

    if (!result)
      throw "No data found!"
    else
      return result
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.deleteVaccineBatch = (id) => {
  try {
    const manager = new VaccineBatchDB()
    const data = manager.delete(id)

    if (!data)
      throw "No data found!"
    else
      return data
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

// TASK: VACCINE QUOTA
exports.getAllVaccineQuota = () => {
  try {
    const manager = new VaccineQuotaDB()
    const data = manager.fetchAll()

    if (!data)
      throw "No data found!"
    else
      return data
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.getVaccineQuota = (id) => {
  try {
    const manager = new VaccineQuotaDB()
    const data = manager.fetchByID(id)

    if (!data)
      throw "No data found!"
    else
      return data
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.addVaccineQuota = () => {
  try {
    const { vaccineTypeID, clusterID, ageGroup, quota } = data

    if (!vaccineTypeID || !clusterID || !ageGroup || !quota) throw "Incorrect arguments specified!"

    const manager = new VaccineQuotaDB()
    const result = manager.create({ vaccineTypeID, clusterID, ageGroup, quota })

    if (!result)
      throw "No data found!"
    else
      return result
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.updateVaccineQuota = (id, data) => {
  try {
    const { vaccineTypeID, clusterID, ageGroup, quota } = data

    if (!vaccineTypeID || !clusterID || !ageGroup || !quota) throw "Incorrect arguments specified!"

    const manager = new VaccineQuotaDB()
    const result = manager.update(id, { vaccineTypeID, clusterID, ageGroup, quota })

    if (!result)
      throw "No data found!"
    else
      return result
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.deleteVaccineQuota = (id) => {
  try {
    const manager = new VaccineQuotaDB()
    const data = manager.delete(id)

    if (!data)
      throw "No data found!"
    else
      return data
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

// TASK: CLUSTER
exports.getAllClusters = () => {
  try {
    const manager = new ClusterDB()
    const data = manager.fetchAll()

    if (!data)
      throw "No data found!"
    else
      return data
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.getCluster = (id) => {
  try {
    const manager = new ClusterDB()
    const data = manager.fetchByID(id)

    if (!data)
      throw "No data found!"
    else
      return data
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.addCluster = (data) => {
  try {
    const { location, name, pinCodes, managerID, populationDensity } = data

    if (!location || !name || !pinCodes || !managerID || !populationDensity) throw "Incorrect arguments specified!"

    const manager = new ClusterDB()
    const result = manager.create({ location, name, pinCodes, managerID, populationDensity })

    if (!result)
      throw "No data found!"
    else
      return result
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.updateCluster = (id, data) => {
  try {
    const { location, name, pinCodes, managerID, populationDensity } = data

    if (!location || !name || !pinCodes || !managerID || !populationDensity) throw "Incorrect arguments specified!"

    const manager = new ClusterDB()
    const result = manager.update(id, { location, name, pinCodes, managerID, populationDensity })

    if (!result)
      throw "No data found!"
    else
      return result
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.deleteCluster = (id) => {
  try {
    const manager = new ClusterDB()
    const data = manager.delete(id)

    if (!data)
      throw "No data found!"
    else
      return data
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

// TASK: USER
exports.getAllUsers = () => {
  try {
    const manager = new UserDB()
    const data = manager.fetchAll()

    if (!data)
      throw "No data found!"
    else
      return data
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.getUser = (id) => {
  try {
    const manager = new UserDB()
    const data = manager.fetchByID(id)

    if (!data)
      throw "No data found!"
    else
      return data
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.addUser = (data) => {
  try {
    const { firstName, lastName, age, mobileNumber, pinCode, uid } = data

    if (!firstName || !lastName || !age || !mobileNumber || !pinCode || !uid) throw "Incorrect arguments specified!"

    const manager = new UserDB()
    const result = manager.create({ firstName, lastName, age, mobileNumber, pinCode, uid })

    if (!result)
      throw "No data found!"
    else
      return result
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.updateUser = (id, data) => {
  try {
    const { firstName, lastName, age, mobileNumber, pinCode, uid } = data

    if (!firstName || !lastName || !age || !mobileNumber || !pinCode || !uid) throw "Incorrect arguments specified!"

    const manager = new UserDB()
    const result = manager.update(id, { firstName, lastName, age, mobileNumber, pinCode, uid })

    if (!result)
      throw "No data found!"
    else
      return result
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.deleteUser = () => {
  try {
    const manager = new UserDB()
    const data = manager.delete(id)

    if (!data)
      throw "No data found!"
    else
      return data
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

// TASK: STAFF
exports.getAllStaff = () => {
  try {
    const manager = new StaffDB()
    const data = manager.fetchAll()

    if (!data)
      throw "No data found!"
    else
      return data
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.getStaff = (id) => {
  try {
    const manager = new StaffDB()
    const data = manager.fetchByID(id)

    if (!data)
      throw "No data found!"
    else
      return data
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.addStaff = (data) => {
  try {
    const { firstName, lastName, mobileNumber, email, password, clusterID, type } = data

    if (!firstName || !lastName || !mobileNumber || !email || !password || !clusterID || !type) throw "Incorrect arguments specified!"

    const manager = new StaffDB()
    const result = manager.create({ firstName, lastName, mobileNumber, email, password, clusterID, type })

    if (!result)
      throw "No data found!"
    else
      return result
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.updateStaff = (id, data) => {
  try {
    const { firstName, lastName, mobileNumber, email, password, clusterID, type } = data

    if (!firstName || !lastName || !mobileNumber || !email || !password || !clusterID || !type) throw "Incorrect arguments specified!"

    const manager = new StaffDB()
    const result = manager.delete(id)

    if (!result)
      throw "No data found!"
    else
      return result
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.deleteStaff = () => {
  try {
    const manager = new StaffDB()
    const data = manager.delete(id)

    if (!data)
      throw "No data found!"
    else
      return data
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

// TASK: APPOINTMENT
exports.getAllAppointments = () => {
  try {
    const manager = new AppointmentDB()
    const data = manager.fetchAll()

    if (!data)
      throw "No data found!"
    else
      return data
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.getAppointment = (id) => {
  try {
    const manager = new AppointmentDB()
    const data = manager.fetchByID(id)

    if (!data)
      throw "No data found!"
    else
      return data
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.addAppointment = (data) => {
  try {
    const { userID, clusterID, vaccineBatchID, dateOfAppointment } = data

    if (!userID || !clusterID || !vaccineBatchID || !dateOfAppointment) throw "Incorrect arguments specified!"

    const manager = new AppointmentDB()
    const result = manager.delete(id)

    if (!result)
      throw "No data found!"
    else
      return result
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.updateAppointment = (id, data) => {
  try {
    const { userID, clusterID, vaccineBatchID, dateOfAppointment, status } = data

    if (!userID || !clusterID || !vaccineBatchID || !dateOfAppointment, status) throw "Incorrect arguments specified!"

    const manager = new AppointmentDB()
    const result = manager.update(id, { userID, clusterID, vaccineBatchID, dateOfAppointment, status })

    if (!result)
      throw "No data found!"
    else
      return result
  }
  catch (err) {
    logger.error(err)
    return false
  }
}

exports.deleteAppointment = (id) => {
  try {
    const manager = new AppointmentDB()
    const data = manager.delete(id)

    if (!data)
      throw "No data found!"
    else
      return data
  }
  catch (err) {
    logger.error(err)
    return false
  }
}
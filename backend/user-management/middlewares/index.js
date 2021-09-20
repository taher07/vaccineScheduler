const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");
const { getAccessLevel, logger } = require("../utils")
const AppointmentDB = require("../database/appointment")
const ClusterDB = require("../database/cluster")
const StaffDB = require("../database/staff")
const UserDB = require("../database/user")
const VaccineBatchDB = require("../database/vaccineBatch")
const VaccineQuotaDB = require("../database/vaccineQuota")
const VaccineTypeDB = require("../database/vaccineType")

exports.isAuthenticated = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });
  try {
    jwt.verify(token, secretKey);
    next();
  } catch (exception) {
    res.status(400).json({ message: "Invalid token." });
  }
}

exports.isAdministrator = (req, res, next) => {
  const accessLevel = getAccessLevel(req.current.type)

  if (accessLevel === 6)
    next()
  else
    return res.status(401).json({ message: "You aren't authorized to view this endpoint!" })
}

exports.isModerator = (req, res, next) => {
  const accessLevel = getAccessLevel(req.current.type)

  if (accessLevel >= 5)
    next()
  else
    return res.status(401).json({ message: "You aren't authorized to view this endpoint!" })
}

exports.isController = (req, res, next) => {
  const accessLevel = getAccessLevel(req.current.type)

  if (accessLevel >= 4)
    next()
  else
    return res.status(401).json({ message: "You aren't authorized to view this endpoint!" })
}

exports.isManager = (req, res, next) => {
  const accessLevel = getAccessLevel(req.current.type)

  if (accessLevel >= 3)
    next()
  else
    return res.status(401).json({ message: "You aren't authorized to view this endpoint!" })
}

exports.isParamedic = (req, res, next) => {
  const accessLevel = getAccessLevel(req.current.type)

  if (accessLevel >= 2)
    next()
  else
    return res.status(401).json({ message: "You aren't authorized to view this endpoint!" })
}

exports.getAppointmentByID = (req, res, next, id) => {
  try {
    const manager = new AppointmentDB()
    const appointment = manager.fetchByID(id)
    req.appointment = appointment
    next()
  } catch (error) {
    logger.error(error)
    return res.status(400).json({ message: "There seems to be an issue here!" })
  }
}

exports.getClusterByID = (req, res, next, id) => {
  try {
    const manager = new ClusterDB()
    const cluster = manager.fetchByID(id)
    req.cluster = cluster
    next()
  } catch (error) {
    logger.error(error)
    return res.status(400).json({ message: "There seems to be an issue here!" })
  }
}

exports.getStaffByID = (req, res, next, id) => {
  try {
    const manager = new StaffDB()
    const staff = manager.fetchByID(id)
    req.staff = staff
    next()
  } catch (error) {
    logger.error(error)
    return res.status(400).json({ message: "There seems to be an issue here!" })
  }
}

exports.getCurrentID = (req, res, next, id) => {
  try {
    const manager = new StaffDB()
    const staff = manager.fetchByID(id)
    req.current = staff
    next()
  } catch (error) {
    logger.error(error)
    return res.status(400).json({ message: "There seems to be an issue here!" })
  }
}

exports.getUserByID = (req, res, next, id) => {
  try {
    const manager = new UserDB()
    const user = manager.fetchByID(id)
    req.user = user
    next()
  } catch (error) {
    logger.error(error)
    return res.status(400).json({ message: "There seems to be an issue here!" })
  }
}

exports.getVaccineBatchByID = (req, res, next, id) => {
  try {
    const manager = new VaccineBatchDB()
    const vaccineBatch = manager.fetchByID(id)
    req.vaccineBatch = vaccineBatch
    next()
  } catch (error) {
    logger.error(error)
    return res.status(400).json({ message: "There seems to be an issue here!" })
  }
}

exports.getVaccineQuotaByID = (req, res, next, id) => {
  try {
    const manager = new VaccineQuotaDB()
    const vaccineQuota = manager.fetchByID(id)
    req.vaccineQuota = vaccineQuota
    next()
  } catch (error) {
    logger.error(error)
    return res.status(400).json({ message: "There seems to be an issue here!" })
  }
}

exports.getVaccineTypeByID = (req, res, next, id) => {
  try {
    const manager = new VaccineTypeDB()
    const vaccineType = manager.fetchByID(id)
    req.vaccineType = vaccineType
    next()
  } catch (error) {
    logger.error(error)
    return res.status(400).json({ message: "There seems to be an issue here!" })
  }
}
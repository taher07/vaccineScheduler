const { signIn, getAllVaccineTypes, getVaccineType, addVaccineType, updateVaccineType, deleteVaccineType, getAllAppointments, getAllStaff, getAllUsers, getAllClusters, getAllVaccineQuota, getAllVaccineBatches, getVaccineBatch, getVaccineQuota, getCluster, getUser, getStaff, getAppointment, addVaccineBatch, updateVaccineBatch, deleteVaccineBatch, addVaccineQuota, updateVaccineQuota, deleteVaccineQuota, addCluster, updateCluster, deleteCluster, updateUser, addStaff, updateStaff, addAppointment, updateAppointment } = require("../services/staff")

exports.signIn = (req, res) => {
  const { email, password } = req.body

  const token = signIn(email, password)

  if (!token) return res.status(400).json({ message: "You've kinda hit a snag!" })
  else {
    res.cookie(token)
    return res.status(200).json({ messagee: "You've logged in successfully!", token })
  }
}

exports.signOut = (req, res) => {
  res.clearCookie("token")
  return res.status(200)
}

// TASK: VACCINE TYPE
exports.getAllVaccineTypes = (req, res) => {
  const vaccineTypes = getAllVaccineTypes()

  if (vaccineTypes) return res.status(200).json({ vaccineTypes })
  else return res.status(400)
}

exports.getVaccineType = (req, res) => {
  const vaccineType = getVaccineType(req.vaccineType._id)

  if (vaccineType) return res.status(200).json({ vaccineType })
  else return res.status(400)
}

exports.addVaccineType = (req, res) => {
  const vaccineTypeAdded = addVaccineType(req.body)

  if (vaccineTypeAdded) return res.status(200)
  else return res.status(400)
}

exports.updateVaccineType = (req, res) => {
  const vaccineTypeUpdated = updateVaccineType(req.vaccineType._id, req.body)

  if (vaccineTypeUpdated) return res.status(200)
  else return res.status(400)
}

exports.deleteVaccineType = (req, res) => {
  const vaccineTypeDeleted = deleteVaccineType(req.vaccineType._id)

  if (vaccineTypeDeleted) return res.status(200)
  else return res.status(400)
}

// TASK: VACCINE BATCH
exports.getAllVaccineBatches = (req, res) => {
  const vaccineBatches = getAllVaccineBatches()

  if (vaccineBatches) return res.status(200).json({ vaccineBatches })
  else return res.status(400)
}

exports.getVaccineBatch = (req, res) => {
  const vaccineBatch = getVaccineBatch(req.vaccineBatch._id)

  if (vaccineBatch) return res.status(200).json({ vaccineBatch })
  else return res.status(400)
}

exports.addVaccineBatch = (req, res) => {
  const vaccineBatchAdded = addVaccineBatch(req.body)

  if (vaccineBatchAdded) return res.status(200)
  else return res.status(400)
}

exports.updateVaccineBatch = (req, res) => {
  const vaccineBatchUpdated = updateVaccineBatch(req.vaccineBatch._id, req.body)

  if (vaccineBatchUpdated) return res.status(200)
  else return res.status(400)
}

exports.deleteVaccineBatch = (req, res) => {
  const vaccineBatchDeleted = deleteVaccineBatch(req.vaccineBatch._id)

  if (vaccineBatchDeleted) return res.status(200)
  else return res.status(400)
}

// TASK: VACCINE QUOTA
exports.getAllVaccineQuota = (req, res) => {
  const vaccineQuota = getAllVaccineQuota()

  if (vaccineQuota) return res.status(200).json({ vaccineQuota })
  else return res.status(400)
}

exports.getVaccineQuota = (req, res) => {
  const vaccineQuota = getVaccineQuota(req.vaccineQuota._id)

  if (vaccineQuota) return res.status(200).json({ vaccineQuota })
  else return res.status(400)
}

exports.addVaccineQuota = (req, res) => {
  const vaccineQuotaAdded = addVaccineQuota(req.body)

  if (vaccineQuotaAdded) return res.status(200)
  else return res.status(400)
}

exports.updateVaccineQuota = (req, res) => {
  const vaccineQuotaUpdated = updateVaccineQuota(req.vaccineQuota._id, req.body)

  if (vaccineQuotaUpdated) return res.status(200)
  else return res.status(400)
}

exports.deleteVaccineQuota = (req, res) => {
  const vaccineQuotaDeleted = deleteVaccineQuota(req.vaccineQuota._id)

  if (vaccineQuotaDeleted) return res.status(200)
  else return res.status(400)
}

// TASK: CLUSTER
exports.getAllClusters = (req, res) => {
  const clusters = getAllClusters()

  if (clusters) return res.status(200).json({ clusters })
  else return res.status(400)
}

exports.getCluster = (req, res) => {
  const cluster = getCluster(req.cluster._id)

  if (cluster) return res.status(200).json({ cluster })
  else return res.status(400)
}

exports.addCluster = (req, res) => {
  const clusterAdded = addCluster(req.body)

  if (clusterAdded) return res.status(200)
  else return res.status(400)
}

exports.updateCluster = (req, res) => {
  const clusterUpdated = updateCluster(req.cluster._id, req.body)

  if (clusterUpdated) return res.status(200)
  else return res.status(400)
}

exports.deleteCluster = (req, res) => {
  const clusterDeleted = deleteCluster(req.cluster._id)

  if (clusterDeleted) return res.status(200)
  else return res.status(400)
}

// TASK: USER
exports.getAllUsers = (req, res) => {
  const users = getAllUsers()

  if (users) return res.status(200).json({ users })
  else return res.status(400)
}

exports.getUser = (req, res) => {
  const user = getUser(req.user._id)

  if (user) return res.status(200).json({ user })
  else return res.status(400)
}

exports.updateUser = (req, res) => {
  const userUpdated = updateUser(req.user._id, req.body)

  if (userUpdated) return res.status(200)
  else return res.status(400)
}

// TASK: STAFF
exports.getAllStaff = (req, res) => {
  const staff = getAllStaff()

  if (staff) return res.status(200).json({ staff })
  else return res.status(400)
}

exports.getStaff = (req, res) => {
  const staff = getStaff(req.staff._id)

  if (staff) return res.status(200).json({ staff })
  else return res.status(400)
}

exports.addStaff = (req, res) => {
  const staffAdded = addStaff(req.body)

  if (staffAdded) return res.status(200)
  else return res.status(400)
}

exports.updateStaff = (req, res) => {
  const staffUpdated = updateStaff(req.staff._id, req.body)

  if (staffUpdated) return res.status(200)
  else return res.status(400)
}

// TASK: APPOINTMENT
exports.getAllAppointments = (req, res) => {
  const appointments = getAllAppointments()

  if (appointments) return res.status(200).json({ appointments })
  else return res.status(400)
}

exports.getAppointment = (req, res) => {
  const appointment = getAppointment(req.appointment._id)

  if (appointment) return res.status(200).json({ appointment })
  else return res.status(400)
}

exports.addAppointment = (req, res) => {
  const appointmentAdded = addAppointment(req.body)

  if (appointmentAdded) return res.status(200)
  else return res.status(400)
}

exports.registerAppointment = (req, res) => {
  const appointmentUpdated = updateAppointment(req.appointment._id, { ...req.appointment, status: "Registered" })

  if (appointmentUpdated) return res.status(200)
  else return res.status(400)
}

exports.terminateAppointment = (req, res) => {
  const appointmentUpdated = updateAppointment(req.appointment._id, { ...req.appointment, status: "Terminated" })

  if (appointmentUpdated) return res.status(200)
  else return res.status(400)
}

exports.completeAppointment = (req, res) => {
  const appointmentUpdated = updateAppointment(req.appointment._id, { ...req.appointment, status: "Completed" })

  if (appointmentUpdated) return res.status(200)
  else return res.status(400)
}
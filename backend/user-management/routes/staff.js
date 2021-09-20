const router = require('express').Router()
const { signOut, signIn, getAllVaccineTypes, getVaccineType, addVaccineType, updateVaccineType, deleteVaccineType, getAllVaccineBatches, getVaccineBatch, addVaccineBatch, updateVaccineBatch, deleteVaccineBatch, getAllVaccineQuota, getVaccineQuota, addVaccineQuota, updateVaccineQuota, deleteVaccineQuota, getAllClusters, getCluster, addCluster, updateCluster, deleteCluster, getAllStaff, getStaff, addStaff, updateStaff, getAllUsers, getUser, updateUser, getAllAppointments, getAppointment, addAppointment, registerAppointment, terminateAppointment, completeAppointment } = require('../controllers/staff')
const { getStaffByID, getUserByID, getVaccineTypeByID, getVaccineBatchByID, getVaccineQuotaByID, getClusterByID, getAppointmentByID, isAuthenticated, isManager, isAdministrator, isController, isModerator, getCurrentID } = require('../middlewares')
const { updateAppointment } = require('../services/staff')

router.param("currentID", getCurrentID)
router.param("staffID", getStaffByID)
router.param("userID", getUserByID)
router.param("vaccineTypeID", getVaccineTypeByID)
router.param("vaccineBatchID", getVaccineBatchByID)
router.param("vaccineQuotaID", getVaccineQuotaByID)
router.param("clusterID", getClusterByID)
router.param("appointmentID", getAppointmentByID)

router.post("/signin", signIn)
router.get("/signout", signOut)

// TASK: VACCINE TYPE
router.get("/vt/:currentID", isAuthenticated, getAllVaccineTypes)
router.get("/vt/:currentID/:vaccineTypeID", isAuthenticated, getVaccineType)
router.post("/vt/:currentID/add", isAuthenticated, isAdministrator, addVaccineType)
router.patch("/vt/:currentID/:vaccineTypeID", isAuthenticated, isModerator, updateVaccineType)
router.delete("/vt/:currentID/:vaccineTypeID", isAuthenticated, isAdministrator, deleteVaccineType)

// TASK: VACCINE BATCH
router.get("/vb/:currentID", isAuthenticated, getAllVaccineBatches)
router.get("/vb/:currentID/:vaccineBatchID", isAuthenticated, getVaccineBatch)
router.post("/vb/:currentID/add", isAuthenticated, isController, addVaccineBatch)
router.patch("/vb/:currentID/:vaccineBatchID", isAuthenticated, isController, updateVaccineBatch)
router.delete("/vb/:currentID/:vaccineBatchID", isAuthenticated, isController, deleteVaccineBatch)

// TASK: VACCINE QUOTA
router.get("/vq/:currentID", isAuthenticated, getAllVaccineQuota)
router.get("/vq/:currentID/:vaccineQuotaID", isAuthenticated, getVaccineQuota)
router.post("/vq/:currentID/add", isAuthenticated, isModerator, addVaccineQuota)
router.patch("/vq/:currentID/:vaccineQuotaID", isAuthenticated, isModerator, updateVaccineQuota)
router.delete("/vq/:currentID/:vaccineQuotaID", isAuthenticated, isModerator, deleteVaccineQuota)

// TASK: CLUSTER
router.get("/cl/:currentID", isAuthenticated, getAllClusters)
router.get("/cl/:currentID/:clusterID", isAuthenticated, getCluster)
router.post("/cl/:currentID/add", isAuthenticated, isController, addCluster)
router.patch("/cl/:currentID/:clusterID", isAuthenticated, isController, updateCluster)
router.delete("/cl/:currentID/:clusterID", isAuthenticated, isController, deleteCluster)

// TASK: STAFF
router.get("/st/:currentID", isAuthenticated, getAllStaff)
router.get("/st/:currentID/:staffID", isAuthenticated, getStaff)
router.post("/st/:currentID/add", isAuthenticated, isController, addStaff)
router.patch("/st/:currentID/:staffID", isAuthenticated, isManager, updateStaff)

// TASK: USER
router.get("/us/:currentID", isAuthenticated, getAllUsers)
router.get("/us/:currentID/:userID", isAuthenticated, getUser)
router.patch("/us/:currentID/:userID", isAuthenticated, isController, updateUser)

// TASK: APPOINTMENT
router.get("/ap/:currentID", isAuthenticated, getAllAppointments)
router.get("/ap/:currentID/:appointmentID", isAuthenticated, getAppointment)
router.post("/ap/:currentID/add", isAuthenticated, isManager, addAppointment)
router.patch("/ap/:currentID/:appointmentID", isAuthenticated, isManager, updateAppointment)
router.get("/ap/register/:currentID/:appointmentID", isAuthenticated, registerAppointment)
router.get("/ap/terminate/:currentID/:appointmentID", isAuthenticated, terminateAppointment)
router.get("/ap/complete/:currentID/:appointmentID", isAuthenticated, completeAppointment)

module.exports = router
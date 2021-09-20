const { sendPasscode, sendAppointment } = require('../controllers')
const router = require('express').Router()

router.get('/sendPasscode', sendPasscode)
router.get('/sendAppointment', sendAppointment)

module.exports = router
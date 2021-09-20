const router = require('express').Router()
const { signIn, register, getStatus, verifyPasscode } = require('../controllers/user')
const { getUserByID } = require('../middlewares')

router.param('userID', getUserByID)

router.post('/signin', signIn)
router.post('/register', register)
router.post('/verify', verifyPasscode)
router.get('/appointment/:userID', getStatus)

module.exports = router
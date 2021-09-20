const UserDB = require('../database/user')
const AppointmentDB = require('../database/appointment')

const otpGenerator = require('otp-generator')
const { redisClient } = require('../utils')

exports.getAppointment = async (uid) => {
  const appointmentManager = new AppointmentDB()
  const userManager = new UserDB()

  const user = await userManager.fetchByUID(uid)
  if (!user) return false;

  const res = await appointmentManager.fetchByUserID(user._id)

  if (res) return res;
  else return false;
}

exports.isRegistered = async (uid) => {
  const manager = new UserDB()
  const user = await manager.fetchByUID(uid)

  if (user) return user._id;
  else return false;
}

exports.getPasscode = async (mobileNumber) => {
  if (redisClient.get(mobileNumber)) {
    return redisClient.get(mobileNumber, (err, reply) => reply)
  }
  else {
    const passcode = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
    redisClient.set(mobileNumber, passcode)
    return passcode
  }
}

exports.verifyPasscode = (mobileNumber, passcode) => {
  if (redisClient.get(mobileNumber)) return redisClient.get(mobileNumber, (err, reply) => reply).toString() === passcode ? true : false
  else return "Login";
}

exports.getUserDetails = (uid) => {
  let firstName = "", lastName = "", age = 0, pinCode = 0

  // TODO: Get user details by uid

  // FIXIT: Remove the test data
  firstName = "John"
  lastName = "Doe"
  age = 27
  pinCode = 395003

  if (!firstName || !lastName || !age || !pinCode)
    return false
  else
    return { firstName, lastName, age, pinCode }
}

exports.registerUser = (data) => {
  const { firstName, lastName, age, mobileNumber, pinCode, uid } = data

  if (!firstName || !lastName || !age || !mobileNumber || !pinCode)
    return false

  const manager = new UserDB()
  const created = manager.create({ firstName, lastName, age, mobileNumber, pinCode, uid })

  if (created) return true
  else return false
}
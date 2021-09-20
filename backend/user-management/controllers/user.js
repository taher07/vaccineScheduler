const { notificationUri } = require("../config")
const { isRegistered, getPasscode, getAppointment, verifyPasscode, getUserDetails, registerUser } = require("../services/user")

exports.signIn = (req, res) => {
  const registered = isRegistered(req.body.uid)

  if (registered) res.location(302, `/appointment/${registered}`)
  else res.status(204)
}

exports.register = (req, res) => {
  const mobileNumber = req.body.mobileNumber
  const passcode = getPasscode(mobileNumber)

  return res.redirect(`${notificationUri}/sendPasscode?mobileNumber=${mobileNumber}&passcode=${passcode}`)
}

exports.getStatus = async (req, res) => {
  const appointment = await getAppointment(req.user.uid)

  if (!appointment) return res.status(204);
  else return res.status(200).json({ appointment })
}

exports.verifyPasscode = (req, res) => {
  const { passcode, mobileNumber, uid } = req.body
  const isVerified = verifyPasscode(mobileNumber, passcode)

  if (isVerified === "Login") return res.status(204)
  else if (isVerified) {
    const userData = getUserDetails(req.params.uid)

    if (!userData) return res.status(400).json({ message: "Can't retrieve details at the moment, please try again later" })
    else return registerUser({ ...userData, mobileNumber, uid }) ? res.status(200) : res.status(400).json({ message: "You can't be registered at this time, please try again later" })
  }
  else return res.status(400).json({ message: "You've entered an incorrect passcode" })
}
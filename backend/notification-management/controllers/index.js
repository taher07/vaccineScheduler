const { sendPasscodeNotification } = require("../services")

exports.sendPasscode = (req, res) => {
  const { mobileNumber, passcode } = req.params
  const passcodeSent = sendPasscodeNotification(mobileNumber, passcode)

  if (passcodeSent) return res.status(200)
  else return res.status(400)
}
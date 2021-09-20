const UserDB = require("../database/user")
const VaccineBatchDB = require("../database/vaccineBatch")
const VaccineQuotaDB = require("../database/vaccineQuota")
const ClusterDB = require("../database/cluster");
const AppointmentDB = require("../database/appointment");
const { getAgeGroup, getTimeSlot, logger, sendText, enqueue, dequeue } = require("../utils");
const { startTime } = require("../config");

const userManager = new UserDB()
const vaccineBatchManager = new VaccineBatchDB()
const vaccineQuotaManager = new VaccineQuotaDB()
const clusterManager = new ClusterDB()
const appointmentManager = new AppointmentDB()

exports.allotVaccines = () => {
  const quota = vaccineQuotaManager.fetchAll()

  quota.map(q => {
    const batch = vaccineBatchManager.create({
      clusterID: q.clusterID,
      ageGroup: q.ageGroup,
      dateOfAllotment: new Date(),
      quantity: q.quota,
      remaining: q.quota,
    })

    const cluster = clusterManager.fetchByID(batch.clusterID)
    const queue = `${cluster._id}_${batch.ageGroup}`
    let slotTime = startTime

    const users = this.removePeopleFromQueue(queue, batch.quantity)
    if (!users) break

    users.map(user => {
      const timeSlot = getTimeSlot(slotTime)
      if (!timeSlot) {
        logger.error(`Error in getting time slot for user ${user._id}`)
        continue
      }
      const { hours, minutes } = timeSlot
      const slot = new Date()
      slot.setHours(hours)
      slot.setMinutes(minutes)

      const appointment = appointmentManager.create({
        userID: user._id,
        clusterID: cluster._id,
        vaccineBatchID: batch._id,
        dateOfAppointment: slot
      })

      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }
      const dateTimeFormat = new Intl.DateTimeFormat('en-US', options)
      const timestamp = dateTimeFormat.format(appointment.dateOfAllotment)

      return this.sendAppointmentNotification(user.phoneNumber, timestamp)
    })
  })
}

exports.terminateAppointments = () => {
  const appointments = appointmentManager.fetchAllUnattended()
  if (appointments)
    appointments.map(appointment => {
      appointmentManager.update(appointment._id, { ...appointment, status: "Terminated" })
      this.addPersonToQueue(appointment.userID)
    })
}

exports.addPersonToQueue = (userID) => {
  const person = userManager.fetchByID(userID)
  const ageGroup = getAgeGroup(person.age)
  const cluster = clusterManager.fetchByPincode(person.pincode)
  const name = `${cluster._id}_${ageGroup}`
  enqueue(userID, name)
}

exports.removePeopleFromQueue = (queue, count) => {
  const people = dequeue(queue, count)
  if (people.length) return people
  else return false
}

exports.sendAppointmentNotification = async (phoneNumber, timestamp) => {
  const messageBody = `You've been allotted an appointment for vaccination on ${timestamp}, you're requested to adhere strictly to the aforementioned time in order to avoid termination of your appointment.`
  return await sendText(`+91${phoneNumber}`, messageBody)
}

exports.sendPasscodeNotification = async (phoneNumber, passcode) => {
  const messageBody = `Your OTP is ${passcode}.`
  return await sendText(`+91${phoneNumber}`, messageBody)
}

const { sendAppointmentNotification, sendPasscodeNotification } = require("../services")

const expect = require('chai').expect

describe("vaccinations", () => {
  before(() => {
    const appointments = []
    const appointmentManager = new (require("../database/appointment"))()

    appointments.map(appointment => appointmentManager.create(appointment))
  })

  after(() => {
    const appointmentManager = new (require("../database/appointment"))()
    const appointments = appointmentManager.fetchAll()

    appointments.map(appointment => appointmentManager.delete(appointment._id))

    const userManager = new (require("../database/user"))()
    users.map(user => userManager.delete(user._id))
  })
})

describe("notifications", () => {
  it("should send text successfully", () => {
    const data = ["9898260432", "9824527094"]
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }
    const dateTimeFormat = new Intl.DateTimeFormat('en-US', options)
    const timestamp = dateTimeFormat.format(new Date())

    data.map(item => {
      expect(sendAppointmentNotification(item, timestamp)).to.be.true
      expect(sendPasscodeNotification(item, 963250)).to.be.true
    })
  })

  it("shouldn't send text successfully", () => {
    const data = ["1234567890"]
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }
    const dateTimeFormat = new Intl.DateTimeFormat('en-US', options)
    const timestamp = dateTimeFormat.format(new Date())

    data.map(item => {
      expect(sendAppointmentNotification(item, timestamp)).to.be.a("object")
      expect(sendPasscodeNotification(item, 963250)).to.be.a("object")
    })
  })
})
const agenda = require('agenda')
const { uri } = require('../config')
const { allotVaccines, terminateAppointments } = require('../services')

const job = new agenda({ db: { address: uri } })

job.define("allot vaccines", () => {
  allotVaccines()
})

job.define("terminate unattended appointments", () => {
  terminateAppointments()
})

  ; (async () => {
    await job.start()
    await job.schedule("in 1 minute", "allot vaccines")
    await job.every("@daily", "allot vaccines")
    await job.schedule("in 1 minute", "terminate unattended appointments")
    await job.every("*/30 * * * *", "terminate unattended appointments")
  })()
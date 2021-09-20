const path = require('path')
const redis = require('redis')
const { startTime, gapTimeInMinutes, endTime, redisHost, redisPort, redisPassword } = require("../config")
const { createLogger, format, transports } = require('winston')

exports.getAccessLevel = (type) => {
  if (type === "Administrator")
    return 6
  else if (type === "Moderator")
    return 5
  else if (type === "Controller")
    return 4
  else if (type === "Manager")
    return 3
  else if (type === "Paramedic")
    return 2
  else
    return 1
}

exports.getTimeSlot = (current_time) => {
  let hours = parseInt(current_time.split(':')[0])
  let minutes = parseInt(current_time.split(':')[1])

  const startHours = parseInt(startTime.split(':')[0])
  const startMinutes = parseInt(startTime.split(':')[1])

  const endHours = parseInt(endTime.split(':')[0])
  const endMinutes = parseInt(endTime.split(':')[1])

  if (hours >= startHours && hours <= endHours) {
    minutes += gapTimeInMinutes
    if (minutes >= 60) {
      hours++
      minutes -= 60
    }
    if (hours > startHours && hours < endHours)
      return formatTime(hours, minutes)
    else if (hours === startHours) {
      if (minutes >= startMinutes)
        return formatTime(hours, minutes)
      else
        return "error"
    }
    else if (hours === endHours) {
      if (minutes <= endMinutes)
        return formatTime(hours, minutes)
      else
        return "error"
    }
    else return "error"
  }
  else return "error"
}

formatTime = (hours, minutes) => {
  if (hours >= 0 && hours < 10)
    hours = "0" + hours
  if (minutes >= 0 && minutes < 10)
    minutes = "0" + minutes
  return `${hours}:${minutes}`
}

const today = new Date()
const fileName = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`

exports.logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.prettyPrint()
  ),
  defaultMeta: {
    service: 'user-service'
  },
  transports: [
    new transports.File({ filename: path.join(__dirname, `../logs/${fileName}_error.log`), level: 'error' }),
    new transports.File({ filename: path.join(__dirname, `../logs/${fileName}_info.log`) }),
    new transports.Console({ format: format.simple() }),
  ]
})

exports.redisClient = redis.createClient({
  host: redisHost,
  port: redisPort,
  password: redisPassword
})

this.redisClient.on("error", (err) => {
  this.logger.error(err)
})
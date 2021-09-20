const path = require('path')
const sqlite = require('sqlite3').verbose();
const { startTime, gapTimeInMinutes, endTime, twilioSID, twilioAuthToken } = require("../config")
const { createLogger, format, transports } = require('winston');
const db = new sqlite.Database('queue.sql');

const insertionQuery = db.prepare("insert into users values (?, ?)")
const deletionQuery = db.prepare("delete from users where id = ?")

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
  return { hours, minutes }
}

const today = new Date()
const fileName = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`

exports.getAgeGroup = (age) => {
  if (age >= 0 && age <= 17) return "Kid"
  else if (age >= 18 && age <= 60) return "Adult"
  else if (age > 60) return "Elderly"
  else return false
}

exports.logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.prettyPrint()
  ),
  defaultMeta: {
    service: 'notification-service'
  },
  transports: [
    new transports.File({ filename: path.join(__dirname, `../logs/${fileName}_error.log`), level: 'error' }),
    new transports.File({ filename: path.join(__dirname, `../logs/${fileName}_info.log`) }),
    new transports.Console({ format: format.simple() }),
  ]
})

exports.sendText = async (phoneNumber, message) => {
  const accountSid = twilioSID
  const authToken = twilioAuthToken
  const client = require('twilio')(accountSid, authToken);

  try {
    const response = await client.messages
      .create({
        body: message,
        from: '+12085059713',
        to: phoneNumber
      })
    this.logger.info(`[${response.sid}] - "${response}" sent to ${phoneNumber}`)
    return true
  } catch (error) {
    this.logger.error(error)
    return false
  }
}

exports.enqueue = (userID, clusterTag) => {
  db.run("create table if not exists users (id text primary key, tag text)", (err) => { if (err) this.logger.error(err) })
  insertionQuery.run([userID, clusterTag], (res, err) => {
    if (err) this.logger.error(err)
    if (res) this.logger.info(res)
  })
}

exports.dequeue = (queue, count) => {
  let data = []
  db.run("create table if not exists users (id text primary key, tag text)", (err) => { if (err) this.logger.error(err) })
  db.all(`select * from users where tag is ${queue} limit by ${count}`, (err, rows) => {
    if (err) this.logger.error(err)
    if (rows) rows.forEach(row => {
      data.push({ user: row.id, cluster: row.tag })
      deletionQuery.run(row.id, (res, err) => {
        if (err) this.logger.error(err)
        if (res) this.logger.info(res)
      })
    })
  })
  return data
}
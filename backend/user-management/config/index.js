require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3200,
  uri: process.env.DATABASE_URI || "mongodb://localhost:27017/vaccine-scheduler",
  gapTimeInMinutes: process.env.GAP_TIME_IN_MINUTES || 5,
  startTime: process.env.START_TIME || "10:00",
  endTime: process.env.END_TIME || "16:00",
  secretKey: process.env.SECRET_KEY || "TheGreatTaher",
  notificationUri: process.env.NOTIFICATION_URI || "localhost:3300/api/v1/notifications",
  redisHost: process.env.REDIS_HOST || "localhost",
  redisPort: process.env.REDIS_PORT || 60484,
  redisPassword: process.env.REDIS_PASSWORD || ""
}